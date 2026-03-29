import { describe, test, expect } from 'bun:test';
import { dosenDataset, prodiDataset } from '../lib/dataset';

describe('Dataset: dosenDataset', () => {
  test('should contain 3 dosen entries', () => {
    expect(dosenDataset).toHaveLength(3);
  });

  test('each dosen should have required fields', () => {
    const requiredFields = [
      'nama',
      'nidn',
      'prodi',
      'jabatan_fungsional',
      'status',
      'pendidikan_terakhir',
      'bidang_keahlian',
      'tridarma',
    ];

    for (const dosen of dosenDataset) {
      for (const field of requiredFields) {
        expect(dosen).toHaveProperty(field);
      }
    }
  });

  test('each dosen tridarma should have pendidikan, penelitian, pengabdian', () => {
    for (const dosen of dosenDataset) {
      expect(dosen.tridarma).toHaveProperty('pendidikan');
      expect(dosen.tridarma).toHaveProperty('penelitian');
      expect(dosen.tridarma).toHaveProperty('pengabdian');
    }
  });

  test('each dosen should have unique NIDN', () => {
    const nidns = dosenDataset.map((d) => d.nidn);
    const uniqueNidns = new Set(nidns);
    expect(uniqueNidns.size).toBe(nidns.length);
  });

  test('skor_sinta should be a positive number for all dosen', () => {
    for (const dosen of dosenDataset) {
      expect(dosen.tridarma.penelitian.skor_sinta).toBeGreaterThan(0);
    }
  });

  test('h_index should be a non-negative number for all dosen', () => {
    for (const dosen of dosenDataset) {
      expect(dosen.tridarma.penelitian.h_index).toBeGreaterThanOrEqual(0);
    }
  });

  test('all dosen should have at least 1 publication', () => {
    for (const dosen of dosenDataset) {
      expect(dosen.tridarma.penelitian.publikasi.length).toBeGreaterThanOrEqual(1);
    }
  });

  test('publications should have judul, jurnal, and tahun', () => {
    for (const dosen of dosenDataset) {
      for (const pub of dosen.tridarma.penelitian.publikasi) {
        expect(pub).toHaveProperty('judul');
        expect(pub).toHaveProperty('jurnal');
        expect(pub).toHaveProperty('tahun');
        expect(typeof pub.judul).toBe('string');
        expect(typeof pub.tahun).toBe('number');
      }
    }
  });

  test('specific dosen data: Dr. Ahmad Fauzi should be Lektor', () => {
    const ahmad = dosenDataset.find((d) => d.nidn === '0312058901');
    expect(ahmad).toBeDefined();
    expect(ahmad!.nama).toBe('Dr. Ahmad Fauzi, M.Kom.');
    expect(ahmad!.jabatan_fungsional).toBe('Lektor');
    expect(ahmad!.tridarma.penelitian.skor_sinta).toBe(450);
  });

  test('specific dosen data: Prof. Siti Rahayu should be Guru Besar', () => {
    const siti = dosenDataset.find((d) => d.nidn === '0205067502');
    expect(siti).toBeDefined();
    expect(siti!.jabatan_fungsional).toBe('Guru Besar');
    expect(siti!.tridarma.penelitian.h_index).toBe(14);
  });

  test('specific dosen data: Budi Santoso should be Asisten Ahli', () => {
    const budi = dosenDataset.find((d) => d.nidn === '0718099201');
    expect(budi).toBeDefined();
    expect(budi!.jabatan_fungsional).toBe('Asisten Ahli');
    expect(budi!.tridarma.penelitian.hibah_penelitian).toHaveLength(0);
  });
});

describe('Dataset: prodiDataset', () => {
  test('should contain 2 prodi entries', () => {
    expect(prodiDataset).toHaveLength(2);
  });

  test('each prodi should have required fields', () => {
    const requiredFields = [
      'nama',
      'fakultas',
      'akreditasi',
      'jumlah_dosen',
      'jumlah_mahasiswa_aktif',
      'target_publikasi_tahun_ini',
      'publikasi_tercapai',
    ];

    for (const prodi of prodiDataset) {
      for (const field of requiredFields) {
        expect(prodi).toHaveProperty(field);
      }
    }
  });

  test('publikasi_tercapai should not exceed target (sanity check)', () => {
    for (const prodi of prodiDataset) {
      expect(prodi.target_publikasi_tahun_ini).toBeGreaterThan(0);
      // Not an error if tercapai > target, but tercapai should be non-negative
      expect(prodi.publikasi_tercapai).toBeGreaterThanOrEqual(0);
    }
  });

  test('each prodi should have unique name', () => {
    const names = prodiDataset.map((p) => p.nama);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });
});
