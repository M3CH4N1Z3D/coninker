import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { orderData } = await req.json();

  const merchantId = process.env.NEXT_PUBLIC_PAYU_MERCHANT_ID!;
  const accountId = process.env.NEXT_PUBLIC_PAYU_ACCOUNT_ID!;
  const apiKey = process.env.NEXT_PUBLIC_PAYU_API_KEY!;
  const currency = "COP";
  // Asegúrate que el referenceCode no tenga espacios ni caracteres especiales
  const referenceCode = `ORD-${Date.now()}`;

  // Asegúrate que amount sea string numérico, máximo 2 decimales
  const amount = parseFloat(orderData.total).toFixed(2);

  // Genera la firma exactamente como indica la documentación
  const signatureRaw = `${apiKey}~${merchantId}~${referenceCode}~${amount}~${currency}`;
  const signature = crypto.createHash("md5").update(signatureRaw).digest("hex");

  // const responseUrl = `${req.nextUrl.origin}/checkout/confirmacion?ref=${referenceCode}`;
  const responseUrl = `https://903b354h-3000.use2.devtunnels.ms/checkout/confirmacion?ref=${referenceCode}`;
  const confirmationUrl = "https://coninker.com/api/payments/webhook";

  // Opcional: idioma
  const lng = "es";

  // Puedes dejar logs para depuración (eliminarlos en producción)
  console.log({
    merchantId,
    accountId,
    apiKey,
    referenceCode,
    amount,
    currency,
    signature,
    buyerEmail: orderData.email,
    responseUrl,
    confirmationUrl,
    signatureRaw,
  });

  const html = `
  <form id="payuForm" method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
    <input name="lng" value="${lng}" type="hidden" />
    <input name="merchantId" value="${merchantId}" type="hidden" />
    <input name="accountId" value="${accountId}" type="hidden" />
    <input name="algorithmSignature" value="MD5" type="hidden" />
    <input name="signature" value="${signature}" type="hidden" />
    <input name="description" value="Compra en Coninker" type="hidden" />
    <input name="referenceCode" value="${referenceCode}" type="hidden" />
    <input name="amount" value="${amount}" type="hidden" /> 
    <input name="currency" value="${currency}" type="hidden" />
    <input name="buyerEmail" value="${orderData.email}" type="hidden" />
    <input name="payerEmail" value="${orderData.email}" type="hidden" />
    <input name="responseUrl" value="${responseUrl}" type="hidden" />
    <input name="confirmationUrl" value="${confirmationUrl}" type="hidden" />
    <input name="tax" value="0" type="hidden" />
    <input name="taxReturnBase" value="0" type="hidden" />
    <input name="payerFullName" value="${orderData.nombre} ${orderData.apellido}" type="hidden" />
    <input name="buyerFullName" value="${orderData.nombre} ${orderData.apellido}" type="hidden" />
    <input name="billingAddress" value="${orderData.direccion}" type="hidden" />
    <input name="shippingAddress" value="${orderData.direccion}" type="hidden" />
    <input name="zipCode" value="110111" type="hidden" />
    <input name="billingCity" value="${orderData.municipio}" type="hidden" />
    <input name="billingCountry" value="CO" type="hidden" />

    <input name="test" value="1" type="hidden" />
  </form>
  <script>document.getElementById("payuForm").submit();</script>
`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
}
