import fastify from 'fastify';
import { main as mainVrt } from '@web-speed-hackathon/vrt/src';
import { main as mainScoring } from '@web-speed-hackathon/scoring/src';
import { execSync } from 'child_process';

const server = fastify();

server.get('/ping', async (request, reply) => {
  return 'pong\n';
});

server.post<{
  Params: {queueId: string}
}>('/execute/:queueId', async (request, reply) => {
  // TODO: target url from request.params.queueId
  const targetUrl = 'https://example.com';
  // VRTの実行
  await mainVrt(targetUrl);
  // 差分チェック
  execSync('reg-cli ./tmp/actual ../vrt/expected ./tmp/diff -M 0.15 -T 0.005 -I -J ./tmp/reg.json');
  // スコアの取得
  const result = await mainScoring(request.params.queueId, targetUrl);

  // TODO: save result to database
  return result;
});

server.listen(8080, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
