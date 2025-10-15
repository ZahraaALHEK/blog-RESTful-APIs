const { UploadcareClient } = await import("@uploadcare/rest-client");
const { uploadcareKey, uploadcareSecretKey } = require("./../config/Keys");
const generateCode = require("./generateCode");

async function getClient() {
  const { UploadcareClient } = await import("@uploadcare/rest-client");
  return new UploadcareClient({
    publicKey: uploadcareKey,
    secretKey: uploadcareSecretKey,
  });
}

const uploadFileToUploadcare = async ({ file, ext }) => {
  const client = await getClient();
  const key = generateCode(12) + "_" + Date.now() + ext;

  try {
    // ✅ الطريقة الصحيحة لرفع Buffer
    const result = await client.uploadFile(file.buffer, {
      filename: key,
      contentType: file.mimetype, // استخدم mimetype من multer
    });

    return result;
  } catch (error) {
    console.error("Upload error:", error);
    return false;
  }
};

module.exports = { uploadFileToUploadcare };
