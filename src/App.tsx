import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { TableDataProps } from "./types";
function App() {
  const [dbExcel, setDBExcel] = useState<null | object>(null);
  const [newExcel, setNewExcel] = useState<null | object>(null);

  const [comparedResult, setComparedResult] = useState<null | []>(null);

  function handleChange(data, inputNum: number) {
    const file = data.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e?.target?.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming the first sheet is the one you want
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (inputNum === 1) {
          setDBExcel(jsonData);
        } else {
          setNewExcel(jsonData);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  function compareSheets(dbData, newData) {
    const emailsNotInDB = newData.filter((eachNew) => {
      return !dbData.some(
        (eachDB) => eachDB.OfficerEmailAddress === eachNew.Email
      );
    });
    setComparedResult(emailsNotInDB);
  }

  console.log(comparedResult);

  const exportFile = () => {
    // Convert JSON to worksheet
    const jsonData = comparedResult?.map((each: TableDataProps) => {
      return {
        Title: "Mr.",
        FirstName: each.FirstName,
        LastName: each.LastName,
      };
    });
    console.log(jsonData);
    // const worksheet = XLSX.utils.json_to_sheet(jsonData);

    // // Create a new workbook
    // const workbook = XLSX.utils.book_new();

    // // Append the worksheet to the workbook
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // // Generate a buffer from the workbook
    // const excelBuffer = XLSX.write(workbook, {
    //   bookType: "xlsx",
    //   type: "array",
    // });

    // const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    // saveAs(blob, "data.xlsx");
  };

  return (
    <div className="h-screen">
      <section className="flex flex-col justify-center bg-rose-200 p-12">
        <div>
          <h1>Excel 1 (database)</h1>
          <input type="file" onChange={(e) => handleChange(e, 1)} />
        </div>
        <div>
          <h1>Excel 2 (new file)</h1>
          <input type="file" onChange={(e) => handleChange(e, 2)} />
        </div>

        <div className="mt-4">
          <button
            disabled={!dbExcel || !newExcel}
            className={`bg-rose-700 text-white px-4 py-1 ${
              (!dbExcel || !newExcel) &&
              "disabled:opacity-50 cursor-not-allowed"
            }`}
            onClick={() => compareSheets(dbExcel, newExcel)}
          >
            Compare
          </button>
        </div>
      </section>

      {comparedResult && (
        <section className="h-3/5 bg-slate-200 p-4 overflow-scroll">
          <h1>Data on New Excel thats not on Database</h1>

          <table>
            <thead>
              <tr>
                <th>Chapter Code</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Whatsapp Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {comparedResult?.map((pres: TableDataProps) => (
                <tr>
                  <td>{pres.ChapterCode}</td>
                  <td>{pres.FirstName}</td>
                  <td>{pres.LastName}</td>
                  <td>{pres.WhatsAppNumber}</td>
                  <td>{pres.Email}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <td colSpan={2}>
                <button
                  className={`bg-rose-700 text-white px-8 py-2 my-6`}
                  onClick={exportFile}
                >
                  Export Chapter President Template
                </button>
              </td>
            </tfoot>
          </table>
        </section>
      )}
    </div>
  );
}

export default App;
