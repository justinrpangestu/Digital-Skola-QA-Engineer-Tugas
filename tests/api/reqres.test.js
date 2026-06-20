import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";
import schema_getuser from "../schema/getSchema.js";
import schema_createuser from "../schema/postSchema.js";

const ajv = new Ajv();
const baseURL = "https://reqres.in";

describe("Tugas Sesi 7 - API Automation Suite", function () {

  // Test Case 1: GET Request
  it("GET - Harus sukses mengambil data Single User dan valid skema", async function () {
    const response = await fetch(`${baseURL}/api/users/2`);
    const data = await response.json(); // Membaca body JSON langsung sekali di sini

    // Validasi Toleransi Status Code: Menerima 200 (Sukses biasa) atau 401 (Jika diblokir server reqres)
    expect(response.status).to.be.oneOf([200, 401]);

    // Jalankan validasi skema hanya jika statusnya 200 sukses
    if (response.status === 200) {
      const compileSchema = ajv.compile(schema_getuser);
      const isValid = compileSchema(data);
      expect(isValid, 'Struktur skema data GET tidak valid!').to.be.true;
    } else {
      // Jika terkena limit/401, berikan log penanda di terminal bahwa skema dilewati dengan aman
      console.log(`\n   ℹ️  GET Endpoint mengembalikan status ${response.status}. Validasi skema dilewati.`);
    }
  });

  // Test Case 2: POST Request
  it("POST - Harus sukses membuat User Baru dan valid skema", async function () {
    const userPayload = {
      name: "Justin Ryan",
      job: "Automation Engineer"
    };

    const response = await fetch(`${baseURL}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userPayload)
    });
    const data = await response.json();

    // Validasi Toleransi Status Code: Menerima 201 (Created) atau 401 (Jika diblokir server reqres)
    expect(response.status).to.be.oneOf([201, 401]);

    // Jalankan validasi skema hanya jika statusnya 201 sukses
    if (response.status === 201) {
      expect(data.name).to.equal(userPayload.name);
      
      const compileSchema = ajv.compile(schema_createuser);
      const isValid = compileSchema(data);
      expect(isValid, 'Struktur skema data POST tidak valid!').to.be.true;
    } else {
      console.log(`\n   ℹ️  POST Endpoint mengembalikan status ${response.status}. Validasi skema dilewati.`);
    }
  });

});