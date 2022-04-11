import { supabaseClient } from "~/libs/supabase.server";

export const scoresForGraph = async () => {
  const { data } = await supabaseClient
    .from<{
      id: string;
      name: string;
      data: { createdAt: string; score: number }[];
    }>("Team")
    .select("id, name, data:Measurement(createdAt, score)")
    .throwOnError();

  return (
    data?.map(({ data, ...rest }) => ({
      ...rest,
      data: data
        .sort(({ createdAt: a }, { createdAt: b }) => (a > b ? 1 : -1))
        .map(({ createdAt, score }) => ({
          createdAt: new Date(createdAt).getTime(),
          score,
        })),
    })) ?? []
  );
};
