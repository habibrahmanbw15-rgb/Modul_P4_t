// 1. Dataset Mock Mahasiswa (Selaras dengan Modul Backend Pertemuan 3)
const studentDataset = [
{ id: 1, nim: "202611001", name: "Ahmad Fauzi", major: "Teknik Informatika", gpa:3.75 },
{ id: 2, nim: "202611002", name: "Budi Santoso", major: "Sistem Informasi", gpa:3.40 },
{ id: 3, nim: "202611003", name: "Citra Lestari", major: "Teknik Informatika", gpa:3.90 }
];


// 2. Fungsi Pengolahan Data Menggunakan ES6
function processAcademicData(students, filterMajor) {
    console.log(`=== Menjalankan Filter Jurusan: ${filterMajor} ===`);
    let totalGpa = 0;
    let matchCount = 0;
    for (const student of students) {
        // Evaluasi kondisi menggunakan Strict Equality (===)
        if (student.major === filterMajor) {
            matchCount++;
            totalGpa += student.gpa;
            // Evaluasi predikat kelulusan cumlaude
            const isHonors = student.gpa >= 3.75 ? "Cumlaude" : "Sangat Memuaskan";
            console.log(`[NIM: ${student.nim}] ${student.name} - IPK: ${student.gpa}(${isHonors})`);
            }
        }
    const averageGpa = matchCount > 0 ? (totalGpa / matchCount).toFixed(2) : 0;
    return {
        major: filterMajor,
        totalStudents: matchCount,
        averageGpa: parseFloat(averageGpa)
        };
    }   
// 3. Eksekusi Fungsi
const result = processAcademicData(studentDataset, "Teknik Informatika");
console.log("Hasil Rekapitulasi:", result);

console.log(`Rata-rata IPK Jurusan ${result.major}: ${result.averageGpa}`);