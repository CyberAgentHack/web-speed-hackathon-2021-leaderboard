import fastify from 'fastify';
import { main as mainScoring } from '@web-speed-hackathon/scoring/src';
import { updateQueueStatus, createMeasurement, fetchTeamInfo } from './database';
import { executeVrt } from './vrt';

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

    const vrtUrl = await executeVrt(request.params.queueId, team.pageUrl);

    // スコアの取得
    const { result } = await mainScoring(request.params.queueId, team.pageUrl);
    if ('error' in result) {
      throw result.error;
    }
    // スコアの記録
    await createMeasurement(team.id, result.score, vrtUrl);
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
