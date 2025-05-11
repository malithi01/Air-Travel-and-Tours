import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
// import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";

import "../stylesheets/bookingReport.css";

const RentReportGenerate = () => {
  const [rentDetails, setRentDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reportType, setReportType] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [vehicleType, setVehicleType] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentDetails = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/rent");
        setRentDetails(res.data.existingRents);
        setFilteredData(res.data.existingRents);
      } catch (err) {
        console.error("Error fetching booking data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentDetails();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [reportType, dateRange, vehicleType, rentDetails]);

  const applyFilters = () => {
    let filtered = [...rentDetails];

    // Filter by vehicle type
    if (vehicleType !== "all") {
      filtered = filtered.filter(
        (item) => item.vehicleType.toLowerCase() === vehicleType.toLowerCase()
      );
    }

    // Filter by date range if date range is selected
    if (reportType === "date-range" && dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      filtered = filtered.filter((item) => {
        const pickupDate = new Date(item.pickUpDate);
        return pickupDate >= startDate && pickupDate <= endDate;
      });
    }

    // Sort by pickup date (newest first)
    filtered.sort((a, b) => new Date(b.pickUpDate) - new Date(a.pickUpDate));

    setFilteredData(filtered);
  };

  // Function to calculate price
  const calculateTotalPrice = (vehicleType, pickUpDate, dropOffDate) => {
    const dailyRates = {
      car: 10000,
      van: 17000,
      bike: 5000,
    };

    const startDate = new Date(pickUpDate);
    const endDate = new Date(dropOffDate);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Minimum 1 day
    const dailyRate = dailyRates[vehicleType.toLowerCase()] || 0;

    return dailyRate * diffDays;
  };

  // Format date for better readability
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate summary statistics
  const calculateSummary = () => {
    const vehicleCounts = { car: 0, van: 0, bike: 0 };
    let totalRevenue = 0;

    filteredData.forEach((booking) => {
      const vehicleType = booking.vehicleType.toLowerCase();
      if (vehicleCounts.hasOwnProperty(vehicleType)) {
        vehicleCounts[vehicleType]++;
      }

      totalRevenue += calculateTotalPrice(
        booking.vehicleType,
        booking.pickUpDate,
        booking.dropOffDate
      );
    });

    return {
      totalBookings: filteredData.length,
      vehicleCounts,
      totalRevenue,
    };
  };

  const summary = calculateSummary();

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const now = new Date();

    // Add report title
    doc.setFontSize(18);
    doc.setTextColor(44, 62, 80);
    doc.text("Vehicle Booking Report", pageWidth / 2, 20, { align: "center" });

    // Add report generation info
    doc.setFontSize(10);
    doc.setTextColor(127, 140, 141);
    doc.text(
      `Generated on: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
      pageWidth / 2,
      28,
      { align: "center" }
    );

    // Add filter information
    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);

    let yPosition = 40;

    doc.text(
      `Report Type: ${reportType === "all" ? "All Bookings" : "Date Range"}`,
      14,
      yPosition
    );
    yPosition += 7;

    if (reportType === "date-range") {
      doc.text(
        `Date Range: ${dateRange.start} to ${dateRange.end}`,
        14,
        yPosition
      );
      yPosition += 7;
    }

    doc.text(
      `Vehicle Type: ${
        vehicleType === "all" ? "All Types" : vehicleType.toUpperCase()
      }`,
      14,
      yPosition
    );
    yPosition += 10;

    // Add summary section
    doc.setFillColor(52, 152, 219);
    doc.rect(14, yPosition, pageWidth - 28, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("Summary", 16, yPosition + 5.5);
    yPosition += 14;

    doc.setTextColor(44, 62, 80);
    doc.text(`Total Bookings: ${summary.totalBookings}`, 16, yPosition);
    yPosition += 7;
    doc.text(
      `Total Revenue: Rs ${summary.totalRevenue.toLocaleString()}`,
      16,
      yPosition
    );
    yPosition += 7;
    doc.text(`Cars: ${summary.vehicleCounts.car}`, 16, yPosition);
    yPosition += 7;
    doc.text(`Vans: ${summary.vehicleCounts.van}`, 16, yPosition);
    yPosition += 7;
    doc.text(`Bikes: ${summary.vehicleCounts.bike}`, 16, yPosition);
    yPosition += 12;

    // Add bookings table
    const tableColumn = [
      "Order ID",
      "Customer",
      "Vehicle",
      "Pick-up Date",
      "Drop-off Date",
      "Amount (Rs)",
    ];

    const tableRows = filteredData.map((booking) => [
      booking.carOrderid,
      booking.nameOfRenter,
      booking.vehicleType,
      formatDate(booking.pickUpDate),
      formatDate(booking.dropOffDate),
      calculateTotalPrice(
        booking.vehicleType,
        booking.pickUpDate,
        booking.dropOffDate
      ).toLocaleString(),
    ]);

    // doc.autoTable({
    //   startY: yPosition,
    //   head: [tableColumn],
    //   body: tableRows,
    //   theme: 'striped',
    //   headStyles: {
    //     fillColor: [52, 152, 219],
    //     textColor: 255
    //   },
    //   alternateRowStyles: {
    //     fillColor: [240, 240, 240]
    //   }
    // });

    // autoTable(doc, {
    //   head: [["Column 1", "Column 2"]],
    //   body: [
    //     ["Data 1", "Data 2"],
    //     ["Data 3", "Data 4"],
    //   ],
    // });
    // doc.save("report.pdf");

    autoTable(doc, {
      startY: yPosition,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      headStyles: {
        fillColor: [52, 152, 219],
        textColor: 255,
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
    });
    doc.save("report.pdf");

    // Save PDF
    doc.save(
      `vehicle_booking_report_${new Date().toISOString().slice(0, 10)}.pdf`
    );
  };

  if (isLoading) {
    return (
      <div className="report-container">
        <h1 className="page-title">Loading Booking Data...</h1>
      </div>
    );
  }

  return (
    <div className="report-container">
      <h1 className="page-title">Booking Report Generator</h1>

      <div className="report-filters">
        <div className="filter-group">
          <label>Report Type:</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="all">All Bookings</option>
            <option value="date-range">Date Range</option>
          </select>
        </div>

        {reportType === "date-range" && (
          <div className="date-range-container">
            <div className="filter-group">
              <label>Start Date:</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
              />
            </div>
            <div className="filter-group">
              <label>End Date:</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
              />
            </div>
          </div>
        )}

        <div className="filter-group">
          <label>Vehicle Type:</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="all">All Vehicles</option>
            <option value="car">Car</option>
            <option value="van">Van</option>
            <option value="bike">Bike</option>
          </select>
        </div>

        <button className="generate-btn" onClick={generatePDF}>
          Generate PDF Report
        </button>
      </div>

      <div className="report-summary">
        <h2>Report Summary</h2>
        <div className="summary-stats">
          <div className="stat-box">
            <div className="stat-value">{summary.totalBookings}</div>
            <div className="stat-label">Total Bookings</div>
          </div>
          <div className="stat-box revenue">
            <div className="stat-value">
              Rs {summary.totalRevenue.toLocaleString()}
            </div>
            <div className="stat-label">Total Revenue</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{summary.vehicleCounts.car}</div>
            <div className="stat-label">Cars</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{summary.vehicleCounts.van}</div>
            <div className="stat-label">Vans</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{summary.vehicleCounts.bike}</div>
            <div className="stat-label">Bikes</div>
          </div>
        </div>
      </div>

      <div className="report-table-container">
        <h2>Booking Details ({filteredData.length})</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Vehicle Type</th>
              <th>Pick-up Location</th>
              <th>Pick-up Date</th>
              <th>Drop-off Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No bookings match your filter criteria
                </td>
              </tr>
            ) : (
              filteredData.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.carOrderid}</td>
                  <td>{booking.nameOfRenter}</td>
                  <td className="vehicle-type">
                    <span
                      className={`vehicle-badge ${booking.vehicleType.toLowerCase()}`}
                    >
                      {booking.vehicleType}
                    </span>
                  </td>
                  <td>{booking.pickUpLocation}</td>
                  <td>{formatDate(booking.pickUpDate)}</td>
                  <td>{formatDate(booking.dropOffDate)}</td>
                  <td className="amount">
                    Rs{" "}
                    {calculateTotalPrice(
                      booking.vehicleType,
                      booking.pickUpDate,
                      booking.dropOffDate
                    ).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentReportGenerate;
