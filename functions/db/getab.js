export async function onRequest(context) {
  // 从环境变量中获取数据库连接
  const database = context.env.webpho_db;
  const url = new URL(context.request.url);
  const username = url.searchParams.get('abname');

  // 检查数据库连接是否已定义
  if (!database) {
    return new Response('Database connection not found.', { status: 500 });
  }

  // 构建SQL查询语句
  const query = 'SELECT imgURL FROM webphostore WHERE ad_name = ?';

  // 执行查询并等待结果
  try {
    const ps = await database.prepare(query).bind(username);
    const result = await ps.raw();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    // 如果查询过程中出现错误，返回错误信息
    return new Response(error.message, { status: 500 });
  }
}
