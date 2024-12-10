import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "./Report.css";

function Report({ image }) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    const fetchReport = async () => {
        if (!image) {
            alert("No image provided for prediction.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/predict",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setResult(response.data || {});
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while processing the image.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, [image]);

    const saveReportAsPDF = () => {
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(38, 127, 143);
        doc.text("Prediction Report", 105, 20, null, null, "center");

        doc.setLineWidth(1.5);
        doc.setDrawColor(63, 81, 181);
        doc.line(20, 25, 190, 25);

        doc.setFontSize(18);
        doc.setTextColor(50, 50, 50);
        doc.text("Tumor Detection Status", 20, 40);

        doc.setFontSize(16);
        if (result && result.tumor_detected) {
            doc.setTextColor(211, 47, 47);
            doc.text("Tumor Detected!", 20, 50);
        } else {
            doc.setTextColor(56, 142, 60);
            doc.text("No Tumor Detected.", 20, 50);
        }

        doc.text("Size: " + (result?.size || "N/A"), 20, 60);
        doc.text("Location: " + (result?.location || "N/A"), 20, 70);
        doc.text("Confidence: " + (result?.confidence || "N/A"), 20, 80);

        doc.setDrawColor(63, 81, 181);
        doc.line(20, 90, 190, 90);

        if (result?.image) {
            const img = `data:image/png;base64,${result.image}`;
            doc.addImage(img, "PNG", 20, 100, 170, 100);
        }

        const date = new Date().toLocaleDateString();
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Date: ${date}`, 20, 250);
        doc.text(`Page: ${doc.internal.getNumberOfPages()}`, 180, 250);

        doc.save("prediction_report.pdf");
    };

    return (
        <div className="report-container">
            <h1 className="report-title">Prediction Report</h1>
            {loading ? (
                <p className="report-loading">Loading...</p>
            ) : result ? (
                result.tumor_detected ? (
                    <div>
                        <p className="report-status"><strong>Tumor Detected!</strong></p>
                        <p className="report-status">Size: {result.size}</p>
                        <p className="report-status">Location: {result.location}</p>
                        <p className="report-status">Confidence: {result.confidence}</p>
                        <h3>Images:</h3>
                        <img
                            src={`data:image/png;base64,${result.image}`}
                            alt="Result"
                            className="report-result-image"
                        />
                    </div>
                ) : (
                    <p className="report-status"><strong>No tumor detected.</strong></p>
                )
            ) : (
                <p>An error occurred. Please try again.</p>
            )}

            <button className="report-save-button" onClick={saveReportAsPDF}>
                Save Report as PDF
            </button>
        </div>
    );
}

export default Report;
