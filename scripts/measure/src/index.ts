import fastify from 'fastify';
import { main as mainVrt } from '@web-speed-hackathon/vrt/src';
import { main as mainScoring } from '@web-speed-hackathon/scoring/src';
import { execSync } from 'child_process';
import { updateQueueStatus, createMeasurement, fetchTeamInfo } from './database';

const server = fastify();

server.get('/ping', async (request, reply) => {
  return 'pong\n';
});

server.post<{
  Params: {queueId: string}
}>('/execute/:queueId', async (request, reply) => {
  try {
    await updateQueueStatus(request.params.queueId, 'RUNNING');
    const team = await fetchTeamInfo(request.params.queueId);

    // VRTの実行
    await mainVrt(team.pageUrl);
    // 差分チェック
    // TODO: save vrt result to storage
    execSync('reg-cli ./tmp/actual ../vrt/expected ./tmp/diff -M 0.15 -T 0.005 -I -J ./tmp/reg.json');
    // スコアの取得
    const { result } = await mainScoring(request.params.queueId, team.pageUrl);
    if ('error' in result) {
      throw result.error;
    }
    // スコアの記録
    await createMeasurement(team.id, result.score);
    await updateQueueStatus(request.params.queueId, 'DONE');

    return result;
  } catch (e) {
    await updateQueueStatus(request.params.queueId, 'FAILED');
    throw e;
  }
});

server.listen(8080, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
