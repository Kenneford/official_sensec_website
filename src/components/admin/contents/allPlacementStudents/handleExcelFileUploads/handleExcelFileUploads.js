import * as XLSX from "xlsx";

// Convert a string to camelCase
const toCamelCase = (str) => {
  return str
    .replace(/\//g, "") // remove spaces
    .replace(/\s(.)/g, function (match, group1) {
      return group1.toUpperCase();
    })
    .replace(/^(.)/, function (match, group1) {
      return group1.toLowerCase();
    });
};

// Function to capitalize first letter of each word
const capitalizeFirstLetter = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// Function to process Excel data
export const processExcelFile = (file, data, setData) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    const excelData = e.target.result;
    const workbook = XLSX.read(excelData, { type: "binary" });

    // Assuming the first sheet is what we need
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert the sheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
    // Remove the header row (the first row)
    jsonData.shift();

    // Get headers (first row) and transform them
    const headers = jsonData[0].map((header) => {
      // Check if the header contains a date in brackets
      if (header.includes("(") && header.includes(")")) {
        if (header === "Index") {
          header = "jhsIndexNo";
        }
        if (header === "Name") {
          header = "fullName";
        }
        if (header === "Gender") {
          header = "gender";
        }
        if (header === "Aggregate") {
          header = "aggregateOfBestSix";
        }
        if (header === "Programme") {
          header = "programme";
        }
        if (header === "Track") {
          header = "trackID";
        }
        if (header === "Status") {
          header = "boardingStatus";
        }
        if (header === "Action") {
          header = "action";
        }
        // Remove brackets and clean up the header
        return header
          .replace(/\s?\(.*?\)/, "")
          .replace(/ /g, "") // remove spaces
          .trim()
          .replace(/^(.)/, function (match, group1) {
            return group1.toLowerCase();
          });
      } else {
        if (header === "Index") {
          header = "jhsIndexNo";
        }
        if (header === "Name") {
          header = "fullName";
        }
        if (header === "Gender") {
          header = "gender";
        }
        if (header === "Aggregate") {
          header = "aggregateOfBestSix";
        }
        if (header === "Programme") {
          header = "programme";
        }
        if (header === "Track") {
          header = "trackID";
        }
        if (header === "Status") {
          header = "boardingStatus";
        }
        if (header === "Action") {
          header = "action";
        }
        // Convert headers with spaces to camelCase
        return toCamelCase(header);
      }
    });

    // Process rows (starting from second row, which contains data)
    const rows = jsonData.slice(1).map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index]; // Don't modify values
      });
      return obj;
    });
    console.log(rows);

    // Apply the capitalizeFirstLetter function to each value
    const formattedData = rows.map((row) => {
      return Object.fromEntries(
        Object.entries(row).map(([key, value]) => {
          return [
            key,
            typeof value === "string" ? capitalizeFirstLetter(value) : value,
          ];
        })
      );
    });
    //   Filter only data with index_number
    const filteredData = formattedData?.filter((std) => std?.jhsIndexNo && std);
    // console.log(filteredData);

    if (filteredData && filteredData.length > 0) {
      // Remove the last column from each row
      const modifiedData = filteredData.map((row) => {
        const keys = Object.keys(row);
        const lastKey = keys[keys.length - 1];
        delete row[lastKey]; // Remove the last column
        return row;
      });
      //   console.log(rows); // This will be your processed data
      setData({ ...data, students: modifiedData });
      console.log(modifiedData);
    }
  };

  reader.readAsArrayBuffer(file);
};

// module.exports = { processExcelFile };
