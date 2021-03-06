/* istanbul ignore file */
import { createProxyMiddleware } from "http-proxy-middleware";
import { NextApiHandler } from "next";
import { getSession } from "shared";
import { graphUrl } from "../config";

export const graphqlProxy: NextApiHandler = async (req, res) => {
  const { userId } = await getSession({ req });

  const apiProxy: any = createProxyMiddleware({
    headers: { "bag-user-id": userId },
    target: graphUrl,
    changeOrigin: true,
    pathRewrite: { [`^/api/proxy`]: "" },
    secure: true,
  });

  apiProxy(req, res);
};
