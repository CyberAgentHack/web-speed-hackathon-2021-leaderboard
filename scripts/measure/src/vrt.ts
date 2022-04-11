import path from 'path';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import archiver from 'archiver';
import { Storage } from '@google-cloud/storage';
import { main as mainVrt } from '@web-speed-hackathon/vrt/src';

export const executeVrt = async (id: string, url: string) => {
  // VRTの実行
  await mainVrt(url);
  // 差分チェック
  execSync('reg-cli ./tmp/actual ../vrt/expected ./tmp/diff -M 0.15 -T 0.005 -I -J ./tmp/reg.json');
  return uploadVrt(id);
}

const uploadVrt = async (id: string) => {
  // zip形式に変更
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });
  const zipPath = path.resolve(process.cwd(), './tmp/archive.zip');
  const output = fs.createWriteStream(zipPath);
  archive.pipe(output);
  archive.directory('./tmp/actual', 'actual');
  archive.directory('./tmp/diff', 'diff');
  archive.file('./tmp/reg.json', { name: 'reg.json' });
  archive.finalize();

  // Google Cloud Storageにアップロード
  const storage = new Storage();
  const bucket = storage.bucket(process.env.BUCKET_NAME);
  const uploadResponse = await bucket.upload(
    zipPath,
    {
      destination: `${id}/archive.zip`,
      predefinedAcl: 'publicRead'
    }
  );

  return uploadResponse[0].publicUrl();
}
