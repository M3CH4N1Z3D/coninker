import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderData } = req.body;

  const merchantId = process.env.NEXT_PUBLIC_PAYU_MERCHANT_ID!;
  const accountId = process.env.NEXT_PUBLIC_PAYU_ACCOUNT_ID!;
  const apiKey = process.env.NEXT_PUBLIC_PAYU_API_KEY!;
  const currency = "COP";
  const referenceCode = `ORD-${Date.now()}`;

  const signature = crypto
    .createHash("md5")
    .update(
      `${apiKey}~${merchantId}~${referenceCode}~${orderData.total}~${currency}`
    )
    .digest("hex");

  const responseUrl = `${req.headers.origin}/order-confirmation?ref=${referenceCode}`;
  const confirmationUrl = "https://tu-backend.com/api/payments/webhook"; // aún no lo usás, pero lo dejás listo

  const html = `
    <form id="payuForm" method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
      <input name="merchantId" value="${merchantId}" type="hidden" />
      <input name="accountId" value="${accountId}" type="hidden" />
      <input name="description" value="Compra en tu tienda" type="hidden" />
      <input name="referenceCode" value="${referenceCode}" type="hidden" />
      <input name="amount" value="${orderData.total}" type="hidden" />
      <input name="currency" value="${currency}" type="hidden" />
      <input name="signature" value="${signature}" type="hidden" />
      <input name="buyerEmail" value="${orderData.email}" type="hidden" />
      <input name="responseUrl" value="${responseUrl}" type="hidden" />
      <input name="confirmationUrl" value="${confirmationUrl}" type="hidden" />
    </form>
    <script>document.getElementById("payuForm").submit();</script>
  `;

  res.status(200).send(html);
}
