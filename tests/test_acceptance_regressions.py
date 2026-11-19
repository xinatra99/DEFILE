"""Defects reproduced during Stage 1 live acceptance."""

import datetime
import subprocess
import pytest
from cryptography import x509
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.x509.oid import NameOID
from defile.fs.hardening import scan_filesystem


def test_public_certificate_is_not_a_world_readable_private_key(tmp_path):
    key=rsa.generate_private_key(public_exponent=65537,key_size=2048)
    name=x509.Name([x509.NameAttribute(NameOID.COMMON_NAME,'Acceptance fixture')])
    now=datetime.datetime.now(datetime.timezone.utc)
    cert=x509.CertificateBuilder().subject_name(name).issuer_name(name).public_key(key.public_key()).serial_number(1).not_valid_before(now-datetime.timedelta(days=1)).not_valid_after(now+datetime.timedelta(days=1)).sign(key,hashes.SHA256())
    path=tmp_path/'public.pem'
    path.write_bytes(cert.public_bytes(serialization.Encoding.PEM))
    path.chmod(0o644)
    assert not any(f.vuln_class=='weak_permissions' for f in scan_filesystem(str(tmp_path)))
    # Mixed public/private bundles must still be protected.
    path.write_bytes(path.read_bytes()+key.private_bytes(serialization.Encoding.PEM,serialization.PrivateFormat.PKCS8,serialization.NoEncryption()))
    assert any(f.vuln_class=='weak_permissions' for f in scan_filesystem(str(tmp_path)))


def test_cve_execution_failure_is_not_a_clean_scan(monkeypatch):
    import defile.vuln.cve_bin_tool as tool
    monkeypatch.setattr(tool,'cve_bin_tool_available',lambda:True)
    def timeout(*args,**kwargs):
        raise subprocess.TimeoutExpired('cve-bin-tool',1)
    monkeypatch.setattr(tool.subprocess,'run',timeout)
    with pytest.raises(RuntimeError,match='incomplete'):
        tool.scan_target('/fixture',timeout=1)


def test_pipeline_records_cve_failure_warning(monkeypatch):
    import defile.pipeline as pipeline
    monkeypatch.setattr(pipeline,'cve_bin_tool_available',lambda:True)
    def failed(*args): raise RuntimeError('CVE correlation is incomplete')
    monkeypatch.setattr(pipeline,'cve_bin_tool_scan',failed)
    report=pipeline.analyze('/bin/true')
    assert any('incomplete' in warning for b in report.binaries for warning in b.warnings)
    assert report.binaries


def test_nested_extraction_does_not_borrow_other_format_metadata():
    from defile.ingest import _merge_regions
    doc={'findings':[{'offset':0,'type':'gzip','description':'compressed gzip','size':123}],
         'extraction':{'extracted':[{'offset':0,'type':'tar','status':'ok','files':1,'dirs':0,'root':'nested-tar'}]}}
    region=_merge_regions(doc,'/fixture')[0]
    assert region['type']=='tar' and region['usable']
    assert region['description']!='compressed gzip' and region['region_size']==0
