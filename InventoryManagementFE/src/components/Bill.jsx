// Bill.jsx - Fixed with editable Net Wt and Gross Amt, and proper print button enabling
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// ================= OM GOLDEN BILL PRINT COMPONENT =================
const OmGoldenBill = ({ 
  bill = {},
  shopDetails = {},
}) => {
  const printRef = useRef(null);

  const styles = {
    page: {
      width: '720px',
      margin: '0 auto',
      background: '#fff',
      padding: '8px',
      fontFamily: 'Arial, sans-serif',
      fontSize: '11px',
      color: '#000',
    },
    logoArea: {
      textAlign: 'center',
      padding: '10px 0 4px',
    },
    logoBox: {
      display: 'inline-block',
      border: '3px solid #8B0000',
      background: '#8B0000',
      padding: '6px 20px',
    },
    logoImage: {
      maxWidth: '60px',
      maxHeight: '36px',
      marginBottom: '3px',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    logoText: {
      fontSize: '22px',
      fontWeight: '900',
      color: '#b8860b',
      letterSpacing: '2px',
      margin: '2px 0',
    },
    branchLine: {
      fontSize: '10px',
      fontWeight: '700',
      textAlign: 'center',
      margin: '4px 0',
    },
    outerTable: {
      width: '100%',
      borderCollapse: 'collapse',
      border: '1.5px solid #000',
      marginTop: '4px',
    },
    th: {
      border: '1px solid #000',
      padding: '3px 6px',
      verticalAlign: 'middle',
    },
    td: {
      border: '1px solid #000',
      padding: '3px 6px',
      verticalAlign: 'middle',
      fontSize: '10px',
    },
    labelCell: {
      border: '1px solid #000',
      padding: '3px 6px',
      verticalAlign: 'middle',
      fontWeight: '700',
      fontSize: '10px',
      whiteSpace: 'nowrap',
    },
    itemsHeader: {
      background: '#d8d8d8',
      fontWeight: '700',
      fontSize: '10px',
      textAlign: 'center',
      padding: '4px',
      border: '1px solid #000',
    },
    itemsRow: {
      fontSize: '10px',
      textAlign: 'center',
      padding: '4px',
      border: '1px solid #000',
      height: '24px',
    },
    summaryLabel: {
      fontWeight: '700',
      textAlign: 'center',
      background: '#fff',
      border: '1px solid #000',
      padding: '3px 8px',
      fontSize: '10px',
    },
    summaryValue: {
      textAlign: 'center',
      fontWeight: '700',
      fontSize: '12px',
      border: '1px solid #000',
      padding: '4px',
    },
    bottomRow: {
      border: '1px solid #000',
      padding: '5px 8px',
      fontSize: '10px',
      fontWeight: '700',
      textAlign: 'center',
      verticalAlign: 'middle',
      height: '48px',
      width: '50%',
    },
  };

  // Use default values if bill data is not provided
  const billData = {
    customerId: bill.customerId || '0033',
    dateTime: bill.dateTime || '23-02-2026 10:40:00',
    customerName: bill.customerName || 'SHOBANA',
    billId: bill.billId || '954454',
    contact: bill.contact || '9790835880',
    goldPrice: bill.goldPrice || '13900',
    address: bill.address || 'S14 PHASE 1 JAINS AASHIYANA FLATS VEMBULI AMMAN KOVIL STREET KALAIGNAR KARUNANIDHI NAGAR, CHENNAI 600078',
    idProof: bill.idProof || '691706578736',
    addressProof: bill.addressProof || '691706578736',
    items: bill.items || [{ ornamentType: 'BANGLES 3', code: '', grossWeight: 37.7, stoneWax: 0.5, netWeight: 37.2, purity: 91, grossAmount: 517000 }],
    grandTotal: bill.grandTotal || { grossWeight: 37.7, stoneWax: 0.5, netWeight: 37.2, purity: '91%', grossAmount: 517000 },
    grossAmount: bill.grossAmount || 517000,
    margin: bill.margin || 0,
    netAmount: bill.netAmount || 517000,
    release: bill.release || 'RELEASE',
    amountPaid: bill.amountPaid || 517000,
    amountInWords: bill.amountInWords || 'FIVE LAKH SEVENTEEN THOUSAND RUPEES ONLY (CASH PAID)',
  };

  const shopData = {
    branch: shopDetails.branch || 'Chennai - Peravallur, Perambur',
    contact: shopDetails.contact || '8189920414',
    gst: shopDetails.gst || '33COUPR9413J1Z8',
    address: shopDetails.address || '177A papermills road, peravallur, chennai 600082',
  };

  const EMPTY_ROWS = 4;

  return (
    <div>
      <div ref={printRef}>
        <div style={styles.page}>
          {/* LOGO */}
          <div style={styles.logoArea}>
            <div style={styles.logoBox}>
              <img 
                src="/m3-logo.png" 
                alt="OM Golden Buyers Logo" 
                style={styles.logoImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div style={styles.logoText}>OM GOLDEN BUYERS</div>
            </div>
          </div>

          {/* BRANCH LINE */}
          <div style={styles.branchLine}>
            BRANCH : {shopData.branch} , CONTACT: {shopData.contact} , GST NO: {shopData.gst}
          </div>

          {/* CUSTOMER DETAILS TABLE */}
          <table style={styles.outerTable}>
            <tbody>
              <tr>
                <td colSpan={6} style={{ ...styles.td, fontWeight: '700', textAlign: 'center' }}>
                  ADDRESS : No.&nbsp;&nbsp;&nbsp; {shopData.address}
                </td>
              </tr>
              <tr>
                <td style={styles.labelCell}>CUSTOMER ID</td>
                <td style={styles.td}>{billData.customerId}</td>
                <td style={styles.labelCell}>DATE / TIME</td>
                <td style={styles.td}>{billData.dateTime}</td>
                <td rowSpan={3} colSpan={2} style={{ ...styles.td, textAlign: 'center', width: '72px', padding: '4px' }}>
                  <div style={{ width: '66px', height: '72px', background: '#a08060', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2px auto' }}>
                    <svg width="60" height="68" viewBox="0 0 60 68">
                      <rect width="60" height="68" fill="#a08060" />
                      <ellipse cx="30" cy="22" rx="14" ry="16" fill="#c8a070" />
                      <ellipse cx="30" cy="60" rx="22" ry="18" fill="#c8a070" />
                    </svg>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={styles.labelCell}>CUSTOMER NAME</td>
                <td style={styles.td}>{billData.customerName}</td>
                <td style={styles.labelCell}>BILL ID</td>
                <td style={styles.td}>{billData.billId}</td>
              </tr>
              <tr>
                <td style={styles.labelCell}>CONTACT</td>
                <td style={styles.td}>{billData.contact}</td>
                <td style={styles.labelCell}>GOLD PRICE</td>
                <td style={styles.td}>{billData.goldPrice}</td>
              </tr>
              <tr>
                <td colSpan={2} rowSpan={2} style={{ ...styles.td, fontSize: '9px', fontWeight: '600', verticalAlign: 'top' }}>
                  ADDRESS :{billData.address}
                </td>
                <td style={styles.labelCell}>ID PROOF</td>
                <td colSpan={3} style={styles.td}>{billData.idProof}</td>
              </tr>
              <tr>
                <td style={styles.labelCell}>ADDRESS PROOF</td>
                <td colSpan={3} style={styles.td}>{billData.addressProof}</td>
              </tr>
            </tbody>
          </table>

          {/* ITEMS TABLE */}
          <table style={{ ...styles.outerTable, borderTop: 'none', marginTop: 0 }}>
            <thead>
              <tr>
                {['ORNAMENT TYPE', 'CODE', 'GROSS WEIGHT', 'STONE / WAX', 'NET WEIGHT', 'PURITY', 'GROSS AMOUNT'].map(h => (
                  <th key={h} style={styles.itemsHeader}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {billData.items.map((item, i) => (
                <tr key={i}>
                  <td style={styles.itemsRow}>{item.ornamentType}</td>
                  <td style={styles.itemsRow}>{item.code || ''}</td>
                  <td style={styles.itemsRow}>{item.grossWeight}</td>
                  <td style={styles.itemsRow}>{item.stoneWax}</td>
                  <td style={styles.itemsRow}>{item.netWeight}</td>
                  <td style={styles.itemsRow}>{item.purity}</td>
                  <td style={styles.itemsRow}>{Number(item.grossAmount).toLocaleString('en-IN')}</td>
                </tr>
              ))}
              {Array.from({ length: Math.max(0, EMPTY_ROWS - billData.items.length + 1) }).map((_, i) => (
                <tr key={`empty-${i}`} style={{ height: '28px' }}>
                  {Array.from({ length: 7 }).map((__, j) => (
                    <td key={j} style={{ border: '1px solid #000', height: '28px' }}></td>
                  ))}
                </tr>
              ))}
              <tr>
                <td colSpan={2} style={{ ...styles.itemsRow, fontWeight: '700', textAlign: 'center' }}>GRAND TOTAL</td>
                <td style={{ ...styles.itemsRow, fontWeight: '700' }}>{billData.grandTotal.grossWeight}</td>
                <td style={{ ...styles.itemsRow, fontWeight: '700' }}>{billData.grandTotal.stoneWax}</td>
                <td style={{ ...styles.itemsRow, fontWeight: '700' }}>{billData.grandTotal.netWeight}</td>
                <td style={{ ...styles.itemsRow, fontWeight: '700' }}>{billData.grandTotal.purity}</td>
                <td style={{ ...styles.itemsRow, fontWeight: '700' }}>{Number(billData.grandTotal.grossAmount).toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>

          {/* TERMS + SUMMARY */}
          <table style={{ ...styles.outerTable, borderTop: 'none', marginTop: 0 }}>
            <tbody>
              <tr>
                {/* TERMS */}
                <td style={{ width: '58%', padding: '5px 6px', verticalAlign: 'top', border: '1px solid #000' }}>
                  <div style={{ fontWeight: '700', fontSize: '10px', textAlign: 'center', marginBottom: '3px' }}>TERMS &amp; CONDITIONS</div>
                  <div style={{ fontSize: '9px', lineHeight: '1.45' }}>
                    1. Ornaments once purchased shall not be returned under any circumstances.<br />
                    2. If Any losses are arising out of this purchase, then you are liable to settle full amount.<br />
                    3. Selling stolen gold,silver or fake gold is a criminal offence, if found will be reported to authorities.<br />
                    4. Ornaments were purchased from you based on the declaration that you hold the ownership and saleable title on the ornaments and you completely agree to indemnity OM GOLDEN and it's employees from any further claim arising out of dispute or due to any criminal liabilities framed against you.<br />
                    5. Kindly ensure the correctness of cash before leaving the counter, No claims for shortfall will be entertained thereafter.
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '10px', textAlign: 'center', margin: '5px 0 2px' }}>விதிமுறை மற்றும் நிபந்தனைகள்</div>
                  <div style={{ fontSize: '9px', lineHeight: '1.45' }}>
                    1. ஒருமுறை வாங்கிய ஆபரணங்களை எந்தகுழ்நிலையிலும் திரும்பக் கொடுக்கபடாது<br />
                    2. இந்த வாங்கதலில் ஏதேனும் இழப்புகள் ஏற்பட்டால்,நீங்கள் முழுத்தொகையையும் செலுத்த வேண்டும்<br />
                    3. திருடப்பட்ட தங்கம் வெள்ளி அல்லது போலி தங்க விற்பனை செய்வது கிரியினல் குற்றமாகும். அது கண்டுபிடிக்கப்பட்டால் அதிகாரிகளுக்கு தெரிவிக்கப்படும்.<br />
                    4. ஆபரணங்கள் மீதான உரிமை மற்றும் விற்பனை தலைப்பை நீங்கள் வைத்திருக்கிறீர்கள் என்ற அறிவிப்பின் அடிப்படையில் உங்களிடமிருந்து ஆபரணங்கள் வாங்கப்பட்டன<br />
                    5. கவுண்டரை விட்டு வெளியேறும் முன் பணத்தின் சரியான தன்மையை உறுதி செய்து கொள்ளுங்கள்
                  </div>
                </td>
                {/* SUMMARY */}
                <td style={{ width: '42%', verticalAlign: 'top', border: '1px solid #000', padding: 0 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      {[
                        { label: 'GROSS AMOUNT', value: Number(billData.grossAmount).toLocaleString('en-IN') },
                        { label: 'MARGIN', value: billData.margin || 0 },
                        { label: 'NET AMOUNT', value: Number(billData.netAmount).toLocaleString('en-IN') },
                        { label: 'RELEASE', value: billData.release || '' },
                        { label: 'AMOUNT PAID', value: Number(billData.amountPaid).toLocaleString('en-IN') },
                      ].map(({ label, value }) => (
                        <React.Fragment key={label}>
                          <tr>
                            <td colSpan={2} style={styles.summaryLabel}>{label}</td>
                          </tr>
                          <tr>
                            <td colSpan={2} style={{ ...styles.summaryValue, minHeight: '28px' }}>{value}</td>
                          </tr>
                        </React.Fragment>
                      ))}
                      <tr><td colSpan={2} style={{ border: '1px solid #000', height: '28px' }}></td></tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          {/* THUMB + SIGNATURE */}
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1.5px solid #000', borderTop: 'none' }}>
            <tbody>
              <tr>
                <td style={styles.bottomRow}>THUMB IMPRESSION</td>
                <td style={styles.bottomRow}>CUSTOMER SIGNATURE</td>
              </tr>
            </tbody>
          </table>

          {/* AMOUNT IN WORDS */}
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1.5px solid #000', borderTop: 'none' }}>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #000', padding: '4px 8px', fontSize: '10px', fontWeight: '700', textAlign: 'center' }}>
                  AMOUNT IN WORDS : {billData.amountInWords}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ================= MAIN BILL COMPONENT =================
const Bill = () => {
  // ================= EXISTING STATE MANAGEMENT =================
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [barcode, setBarcode] = useState('');
  
  // Bill information
  const [billNumber, setBillNumber] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  
  // Customer information
  const [customerName, setCustomerName] = useState('Walk-in Customer');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerGST, setCustomerGST] = useState('');
  const [customerAddress, setCustomerAddress] = useState('S14 PHASE 1 JAINS AASHIYANA FLATS VEMBULI AMMAN KOVIL STREET KALAIGNAR KARUNANIDHI NAGAR, CHENNAI 600078');
  const [customerType, setCustomerType] = useState('external');
  const [customerDiscount, setCustomerDiscount] = useState(0);
  
  // ================= NEW GOLD/SILVER STATE =================
  const [billDate, setBillDate] = useState('');
  const [goldRate, setGoldRate] = useState(13900);
  const [silverRate, setSilverRate] = useState(0);
  const [customerId, setCustomerId] = useState('0033');
  const [billId, setBillId] = useState('954454');
  const [customerContact, setCustomerContact] = useState('9790835880');
  const [idProof, setIdProof] = useState('691706578736');
  const [addressProof, setAddressProof] = useState('691706578736');
  const [grandTotalWeight, setGrandTotalWeight] = useState(0);
  const [grandTotalStoneWax, setGrandTotalStoneWax] = useState(0);
  const [grandTotalNetWeight, setGrandTotalNetWeight] = useState(0);
  const [grandTotalPurity, setGrandTotalPurity] = useState('0%');
  const [grandTotalAmount, setGrandTotalAmount] = useState(0);
  
  // Item Details - New gold/silver items
  const [itemType, setItemType] = useState('gold');
  const [goldSilverItems, setGoldSilverItems] = useState([]);
  const [currentGoldSilverItem, setCurrentGoldSilverItem] = useState({
    itemName: '',
    code: '',
    grossWeight: 0,
    stoneWeight: 0,
    netWeight: 0,
    purity: 91,
    margin: 0,
    grossAmount: 0,
    netAmount: 0,
  });
  
  // Gold/Silver Calculations
  const [grossAmountTotal, setGrossAmountTotal] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [netPayableAmount, setNetPayableAmount] = useState(0);
  
  // Payment Details - New fields
  const [paymentMode, setPaymentMode] = useState('cash');
  const [amountPaid, setAmountPaid] = useState(0);
  const [bankPendingAmount, setBankPendingAmount] = useState(0);
  const [amountInWords, setAmountInWords] = useState('ZERO RUPEES ONLY');
  
  // Pledge Information
  const [pledgeOption, setPledgeOption] = useState('physical');
  const [releaseSource, setReleaseSource] = useState('RELEASE');
  const [showReleaseSource, setShowReleaseSource] = useState(true);
  
  // Verification Documents
  const [idProofType, setIdProofType] = useState('ID PROOF');
  const [addressProofType, setAddressProofType] = useState('ADDRESS PROOF');
  const [pledgeCopy, setPledgeCopy] = useState('');
  const [receipt, setReceipt] = useState('');
  
  // Declaration
  const [declarationAccepted, setDeclarationAccepted] = useState(true);
  
  // ================= EXISTING STATE (continued) =================
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [showCompanySelector, setShowCompanySelector] = useState(false);
  
  const [createdBy, setCreatedBy] = useState('');
  
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState('percentage');
  const [manualDiscount, setManualDiscount] = useState(false);
  
  const [tax, setTax] = useState(0);
  const [taxType, setTaxType] = useState('percentage');
  
  const [paidAmount, setPaidAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentStatus, setPaymentStatus] = useState('pending');
  
  const [cashReceived, setCashReceived] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [bankName, setBankName] = useState('');
  const [chequeNumber, setChequeNumber] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [billSaved, setBillSaved] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [lastGeneratedBill, setLastGeneratedBill] = useState(null);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [savedBillId, setSavedBillId] = useState(null);
  const [fetchingCustomer, setFetchingCustomer] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const defaultShopDetails = {
    name: 'OM Golden Buyers',
    address: '177A papermills road, peravallur, chennai 600082',
    city: 'Chennai - Peravallur, Perambur',
    phone: '8189920414',
    gst: '33COUPR9413J1Z8',
    branch: 'Chennai - Peravallur, Perambur',
  };

  const [shopDetails, setShopDetails] = useState(defaultShopDetails);

  const billPaperRef = useRef(null);
  const downloadLinkRef = useRef(null);
  const printModalRef = useRef(null);

  // ================= API SETUP =================
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  api.interceptors.request.use(request => {
    console.log('Starting Request:', request.url);
    return request;
  });

  api.interceptors.response.use(
    response => {
      console.log('Response:', response.status);
      return response;
    },
    error => {
      console.log('Response Error:', error.response?.status, error.response?.data);
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
        setError('Session expired. Please login again.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
      return Promise.reject(error);
    }
  );

  // ================= STYLES (existing + new) =================
  const baseStyles = {
    container: {
      display: 'grid',
      gridTemplateColumns: '1fr 350px',
      gap: '20px',
      padding: '20px',
      minHeight: '100vh',
      background: '#f0f0f0',
      fontFamily: "'Courier New', monospace",
    },
    productPanel: {
      background: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      overflow: 'auto',
      maxHeight: 'calc(100vh - 40px)',
    },
    productPanelTitle: {
      marginBottom: '20px',
      color: '#333',
      borderBottom: '2px solid #333',
      paddingBottom: '10px',
      fontSize: '24px',
    },
    alert: {
      padding: '12px',
      borderRadius: '5px',
      marginBottom: '20px',
      fontWeight: 'bold',
      animation: 'slideIn 0.3s ease',
    },
    alertError: {
      background: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb',
    },
    alertSuccess: {
      background: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb',
    },
    searchSection: {
      background: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
      border: '1px solid #e9ecef',
    },
    searchBox: {
      marginBottom: '15px',
      position: 'relative',
    },
    searchLabel: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#333',
      fontSize: '14px',
    },
    searchInput: {
      width: '100%',
      padding: '12px',
      border: '2px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px',
      fontFamily: "'Courier New', monospace",
      transition: 'border-color 0.3s, box-shadow 0.3s',
      outline: 'none',
    },
    searchLoading: {
      position: 'absolute',
      right: '10px',
      top: '40px',
      color: '#666',
      fontSize: '12px',
      background: 'white',
      padding: '2px 8px',
      borderRadius: '3px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    barcodeInput: {
      display: 'flex',
      gap: '10px',
    },
    barcodeField: {
      flex: 1,
      padding: '12px',
      border: '2px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px',
      fontFamily: "'Courier New', monospace",
      outline: 'none',
    },
    barcodeButton: {
      padding: '12px 20px',
      background: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background 0.3s, transform 0.1s',
    },
    barcodeButtonDisabled: {
      background: '#6c757d',
      cursor: 'not-allowed',
      opacity: 0.7,
    },
    searchResults: {
      background: 'white',
      border: '1px solid #ddd',
      borderRadius: '5px',
      maxHeight: '300px',
      overflowY: 'auto',
      marginTop: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      position: 'absolute',
      width: 'calc(100% - 40px)',
      zIndex: 1000,
    },
    searchResultItem: {
      padding: '12px',
      borderBottom: '1px solid #eee',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'background 0.2s',
    },
    resultInfo: {
      flex: 1,
    },
    resultName: {
      fontWeight: 'bold',
      color: '#333',
    },
    resultDetails: {
      fontSize: '12px',
      color: '#666',
      marginTop: '2px',
    },
    resultPrice: {
      fontWeight: 'bold',
      color: '#28a745',
      fontSize: '16px',
    },
    selectedProducts: {
      marginTop: '20px',
    },
    selectedProductsTitle: {
      marginBottom: '15px',
      color: '#333',
      borderBottom: '1px solid #ddd',
      paddingBottom: '8px',
      fontSize: '18px',
    },
    noItems: {
      textAlign: 'center',
      color: '#999',
      padding: '30px',
      fontStyle: 'italic',
      background: '#f8f9fa',
      borderRadius: '5px',
    },
    selectedItemsList: {
      maxHeight: '400px',
      overflowY: 'auto',
    },
    selectedItem: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 80px 100px 40px',
      gap: '10px',
      padding: '12px',
      background: '#f8f9fa',
      marginBottom: '8px',
      borderRadius: '5px',
      alignItems: 'center',
      border: '1px solid #e9ecef',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    itemInfo: {
      display: 'flex',
      flexDirection: 'column',
    },
    itemName: {
      fontWeight: 'bold',
      color: '#333',
    },
    itemModel: {
      fontSize: '11px',
      color: '#666',
    },
    itemPrice: {
      fontWeight: 'bold',
      color: '#28a745',
    },
    itemTotal: {
      fontWeight: 'bold',
      color: '#28a745',
    },
    itemQuantity: {
      width: '70px',
      padding: '5px',
      border: '1px solid #ddd',
      borderRadius: '3px',
      textAlign: 'center',
      fontFamily: "'Courier New', monospace",
    },
    removeBtn: {
      background: '#dc3545',
      color: 'white',
      border: 'none',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.3s, transform 0.1s',
    },
    billPanel: {
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: '20px',
      height: 'fit-content',
      maxHeight: 'calc(100vh - 40px)',
      overflow: 'auto',
    },
    billContainer: {
      padding: '15px',
    },
    billPaper: {
      background: 'white',
      padding: '15px 12px',
      border: '1px solid #ccc',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      position: 'relative',
      marginBottom: '15px',
      borderRadius: '3px',
      width: '280px',
      margin: '0 auto',
      fontFamily: "'Courier New', monospace",
      fontSize: '11px',
      lineHeight: '1.3',
    },
    billHeader: {
      textAlign: 'center',
      marginBottom: '12px',
      paddingBottom: '8px',
      borderBottom: '1px dashed #333',
    },
    billHeaderH1: {
      fontSize: '16px',
      letterSpacing: '1px',
      marginBottom: '3px',
      color: '#333',
      fontWeight: 'bold',
    },
    billHeaderP: {
      fontSize: '9px',
      color: '#666',
      margin: '1px 0',
      lineHeight: '1.2',
    },
    billInfo: {
      margin: '10px 0',
      padding: '6px 0',
      borderTop: '1px dashed #333',
      borderBottom: '1px dashed #333',
    },
    billInfoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '2px',
      fontSize: '10px',
    },
    billNumber: {
      fontWeight: 'bold',
      color: '#007bff',
    },
    customerSection: {
      margin: '10px 0',
      padding: '8px',
      background: '#f9f9f9',
      borderRadius: '2px',
      border: '1px solid #e9ecef',
    },
    customerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '4px',
      fontSize: '10px',
    },
    customerLabel: {
      fontWeight: 'bold',
      color: '#555',
    },
    customerValue: {
      color: '#333',
      maxWidth: '180px',
      textAlign: 'right',
    },
    customerTypeBadge: {
      padding: '2px 6px',
      borderRadius: '3px',
      fontSize: '9px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    internalBadge: {
      background: '#cce5ff',
      color: '#004085',
    },
    externalBadge: {
      background: '#fff3cd',
      color: '#856404',
    },
    customerInput: {
      width: '100%',
      padding: '4px 6px',
      marginBottom: '4px',
      border: '1px solid #ddd',
      borderRadius: '2px',
      fontFamily: "'Courier New', monospace",
      fontSize: '10px',
      transition: 'border-color 0.3s',
    },
    customerTypeSelect: {
      width: '100%',
      padding: '4px',
      marginBottom: '4px',
      border: '1px solid #ddd',
      borderRadius: '2px',
      fontFamily: "'Courier New', monospace",
      fontSize: '10px',
    },
    billItems: {
      margin: '10px 0',
    },
    billItemsHeader: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
      fontWeight: 'bold',
      padding: '4px 0',
      borderBottom: '1px solid #333',
      fontSize: '10px',
      background: '#f0f0f0',
      paddingLeft: '2px',
    },
    billItem: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
      padding: '3px 0',
      borderBottom: '1px dotted #ccc',
      fontSize: '9px',
      paddingLeft: '2px',
    },
    billItemEmpty: {
      textAlign: 'center',
      color: '#999',
      padding: '10px',
      fontStyle: 'italic',
      fontSize: '10px',
    },
    billItemName: {
      display: 'flex',
      flexDirection: 'column',
    },
    billItemSmall: {
      fontSize: '7px',
      color: '#666',
    },
    billSummary: {
      margin: '10px 0',
      padding: '8px 0',
      borderTop: '1px solid #333',
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '3px',
      fontSize: '10px',
    },
    summaryRowTotal: {
      fontWeight: 'bold',
      fontSize: '12px',
      borderTop: '1px dashed #333',
      paddingTop: '6px',
      marginTop: '6px',
      color: '#333',
    },
    discountSection: {
      margin: '8px 0',
      padding: '6px',
      background: '#f0f7ff',
      borderRadius: '3px',
      border: '1px solid #b8daff',
    },
    discountHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '5px',
      cursor: 'pointer',
    },
    discountTitle: {
      fontWeight: 'bold',
      color: '#004085',
      fontSize: '11px',
    },
    discountToggle: {
      color: '#007bff',
      fontSize: '12px',
    },
    discountControls: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '5px',
      marginTop: '5px',
    },
    discountInput: {
      padding: '4px',
      border: '1px solid #ddd',
      borderRadius: '3px',
      fontFamily: "'Courier New', monospace",
      fontSize: '10px',
      width: '100%',
    },
    discountTypeSelect: {
      padding: '4px',
      border: '1px solid #ddd',
      borderRadius: '3px',
      fontFamily: "'Courier New', monospace",
      fontSize: '10px',
      width: '100%',
    },
    discountAmount: {
      fontSize: '10px',
      color: '#28a745',
      fontWeight: 'bold',
      marginTop: '3px',
    },
    summaryInput: {
      width: '50px',
      padding: '2px',
      border: '1px solid #ddd',
      borderRadius: '2px',
      textAlign: 'right',
      fontFamily: "'Courier New', monospace",
      fontSize: '9px',
      marginLeft: '3px',
    },
    paymentSection: {
      margin: '10px 0',
      padding: '8px',
      background: '#f0f0f0',
      borderRadius: '2px',
      border: '1px solid #ddd',
      fontSize: '10px',
    },
    paymentRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '4px',
      alignItems: 'center',
    },
    paymentSelect: {
      padding: '4px',
      width: '100px',
      border: '1px solid #ddd',
      borderRadius: '2px',
      fontFamily: "'Courier New', monospace",
      fontSize: '9px',
    },
    paymentInput: {
      width: '80px',
      padding: '3px',
      border: '1px solid #ddd',
      borderRadius: '2px',
      textAlign: 'right',
      fontFamily: "'Courier New', monospace",
      fontSize: '9px',
    },
    paymentDetails: {
      marginTop: '8px',
      padding: '6px',
      background: 'white',
      borderRadius: '2px',
      border: '1px solid #ccc',
    },
    paymentDetailsInput: {
      width: '100%',
      padding: '4px',
      marginBottom: '4px',
      border: '1px solid #ddd',
      borderRadius: '2px',
      fontFamily: "'Courier New', monospace",
      fontSize: '9px',
    },
    billFooter: {
      textAlign: 'center',
      marginTop: '15px',
      paddingTop: '10px',
      borderTop: '1px dashed #333',
      fontSize: '8px',
    },
    billFooterP: {
      marginBottom: '2px',
      color: '#666',
    },
    actionButtons: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '8px',
      marginTop: '15px',
    },
    whatsappButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '10px',
      marginTop: '10px',
      background: '#25D366',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background 0.3s',
      textDecoration: 'none',
      width: '100%',
    },
    btn: {
      padding: '10px',
      border: 'none',
      borderRadius: '3px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '12px',
      transition: 'all 0.3s',
      fontFamily: "'Courier New', monospace",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '3px',
    },
    btnDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    btnPrimary: {
      background: '#007bff',
      color: 'white',
    },
    btnSuccess: {
      background: '#28a745',
      color: 'white',
    },
    btnDanger: {
      background: '#dc3545',
      color: 'white',
    },
    btnSecondary: {
      background: '#6c757d',
      color: 'white',
    },
    btnInfo: {
      background: '#17a2b8',
      color: 'white',
    },
    btnWarning: {
      background: '#ffc107',
      color: '#333',
    },
    downloadLink: {
      display: 'none',
    },
    companySelector: {
      marginBottom: '15px',
      padding: '10px',
      background: '#e9ecef',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    companyName: {
      fontWeight: 'bold',
      color: '#007bff',
      fontSize: '14px',
    },
    companyDropdown: {
      marginTop: '5px',
      padding: '5px',
      background: 'white',
      border: '1px solid #ddd',
      borderRadius: '3px',
      maxHeight: '200px',
      overflowY: 'auto',
    },
    companyOption: {
      padding: '8px',
      cursor: 'pointer',
      borderBottom: '1px solid #eee',
      transition: 'background 0.2s',
    },
    companyOptionHover: {
      background: '#f0f7ff',
    },
    goldSilverSection: {
      background: '#f8f9fa',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '20px',
      border: '1px solid #e9ecef',
    },
    goldSilverToggle: {
      display: 'flex',
      gap: '10px',
      marginBottom: '15px',
    },
    toggleBtn: {
      padding: '8px 20px',
      border: '2px solid #ddd',
      borderRadius: '5px',
      background: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      transition: 'all 0.3s',
    },
    toggleBtnActive: {
      borderColor: '#007bff',
      background: '#007bff',
      color: 'white',
    },
    goldSilverItemRow: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr auto',
      gap: '6px',
      alignItems: 'center',
      marginBottom: '6px',
    },
    goldSilverItemHeader: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr auto',
      gap: '6px',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: '9px',
      color: '#555',
      padding: '6px 0',
      borderBottom: '2px solid #ddd',
    },
    goldSilverTotals: {
      marginTop: '15px',
      padding: '15px',
      background: 'white',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '5px 0',
      fontSize: '12px',
    },
    totalRowBold: {
      fontWeight: 'bold',
      fontSize: '14px',
      borderTop: '2px solid #333',
      paddingTop: '10px',
      marginTop: '5px',
    },
    smallInput: {
      width: '100%',
      padding: '4px 6px',
      border: '1px solid #ddd',
      borderRadius: '3px',
      fontSize: '11px',
      fontFamily: "'Courier New', monospace",
    },
    readOnlyInput: {
      width: '100%',
      padding: '4px 6px',
      border: '1px solid #e9ecef',
      borderRadius: '3px',
      fontSize: '11px',
      fontFamily: "'Courier New', monospace",
      background: '#f8f9fa',
      color: '#666',
    },
    pledgeSection: {
      marginTop: '10px',
      padding: '10px',
      background: '#f8f9fa',
      borderRadius: '5px',
      border: '1px solid #e9ecef',
    },
    docsSection: {
      marginTop: '10px',
      padding: '10px',
      background: '#f8f9fa',
      borderRadius: '5px',
      border: '1px solid #e9ecef',
    },
    declarationSection: {
      marginTop: '15px',
      padding: '15px',
      background: '#f8f9fa',
      borderRadius: '5px',
      border: '1px solid #e9ecef',
    },
    printModalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    printModalContent: {
      background: 'white',
      borderRadius: '10px',
      padding: '20px',
      maxWidth: '90%',
      maxHeight: '90vh',
      overflow: 'auto',
      position: 'relative',
    },
    printModalClose: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      cursor: 'pointer',
      fontSize: '18px',
    },
    printModalButton: {
      padding: '10px 30px',
      background: '#8B0000',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontWeight: '700',
      fontSize: '13px',
      cursor: 'pointer',
      marginTop: '10px',
    },
  };

  // ================= EXISTING EFFECTS =================
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setCreatedBy(userData.full_name || userData.name || userData.username || 'System');
      } catch (e) {
        setCreatedBy('System');
      }
    } else {
      setIsAuthenticated(false);
      setError('Please login first');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, []);

  // ================= NEW EFFECTS FOR GOLD/SILVER =================
  useEffect(() => {
    setBillDate(new Date().toISOString().split('T')[0]);
  }, []);

  // Calculate gold/silver item values - UPDATED to allow manual entry
  useEffect(() => {
    const grossWeight = parseFloat(currentGoldSilverItem.grossWeight) || 0;
    const stoneWeight = parseFloat(currentGoldSilverItem.stoneWeight) || 0;
    // Only auto-calculate net weight if it's not manually entered
    const netWeight = parseFloat(currentGoldSilverItem.netWeight) || (grossWeight - stoneWeight);
    const margin = parseFloat(currentGoldSilverItem.margin) || 0;
    const rate = itemType === 'gold' ? goldRate : silverRate;
    const purity = parseFloat(currentGoldSilverItem.purity) || 91;
    const grossAmount = netWeight * rate * (purity / 100);
    const netAmount = Math.max(0, grossAmount - margin);
    
    setCurrentGoldSilverItem(prev => ({
      ...prev,
      netWeight: parseFloat(netWeight.toFixed(3)),
      grossAmount: parseFloat(grossAmount.toFixed(2)),
      netAmount: parseFloat(netAmount.toFixed(2)),
    }));
  }, [currentGoldSilverItem.grossWeight, currentGoldSilverItem.stoneWeight, 
      currentGoldSilverItem.margin, currentGoldSilverItem.purity,
      goldRate, silverRate, itemType]);

  // Calculate totals when gold/silver items change
  useEffect(() => {
    let grossTotal = 0;
    let deductionsTotal = 0;
    let totalGrossWeight = 0;
    let totalStoneWeight = 0;
    let totalNetWeight = 0;
    let totalPurity = 0;
    
    goldSilverItems.forEach(item => {
      grossTotal += item.grossAmount || 0;
      deductionsTotal += item.margin || 0;
      totalGrossWeight += item.grossWeight || 0;
      totalStoneWeight += item.stoneWeight || 0;
      totalNetWeight += item.netWeight || 0;
      totalPurity += item.purity || 0;
    });
    
    setGrossAmountTotal(grossTotal);
    setTotalDeductions(deductionsTotal);
    setNetPayableAmount(grossTotal - deductionsTotal);
    setGrandTotalWeight(totalGrossWeight);
    setGrandTotalStoneWax(totalStoneWeight);
    setGrandTotalNetWeight(totalNetWeight);
    if (goldSilverItems.length > 0) {
      setGrandTotalPurity((totalPurity / goldSilverItems.length) + '%');
    } else {
      setGrandTotalPurity('0%');
    }
    setGrandTotalAmount(grossTotal - deductionsTotal);
    setAmountPaid(grossTotal - deductionsTotal);
    
    // Update amount in words
    const amount = grossTotal - deductionsTotal;
    if (amount > 0) {
      setAmountInWords(`${amount.toLocaleString('en-IN')} RUPEES ONLY`);
    } else {
      setAmountInWords('ZERO RUPEES ONLY');
    }
  }, [goldSilverItems]);

  useEffect(() => {
    if (pledgeOption === 'physical') {
      setShowReleaseSource(true);
    } else {
      setShowReleaseSource(false);
      setReleaseSource('');
    }
  }, [pledgeOption]);

  // ================= EXISTING FUNCTIONS (preserved) =================
  const fetchCompanies = async () => {
    try {
      const response = await api.get('/companies/list');
      if (response.data && response.data.length > 0) {
        setCompanies(response.data);
        const firstCompany = response.data[0];
        setSelectedCompany(firstCompany);
        fetchCompanyDetails(firstCompany.id);
      }
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('Failed to fetch companies');
    }
  };

  const fetchCompanyDetails = async (companyId) => {
    try {
      const response = await api.get(`/companies/${companyId}`);
      if (response.data) {
        const company = response.data;
        setShopDetails({
          name: company.name || defaultShopDetails.name,
          address: company.address || defaultShopDetails.address,
          city: company.city || defaultShopDetails.city,
          phone: company.phone || defaultShopDetails.phone,
          gst: company.gst_number || defaultShopDetails.gst,
          branch: company.branch || defaultShopDetails.branch,
        });
      }
    } catch (err) {
      console.error('Error fetching company details:', err);
    }
  };

  const handleCompanySelect = async (company) => {
    setSelectedCompany(company);
    setShowCompanySelector(false);
    await fetchCompanyDetails(company.id);
    setSuccess(`Switched to ${company.name}`);
    setTimeout(() => setSuccess(''), 2000);
  };

  const generateBillNumber = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let random = '';
    for (let i = 0; i < 8; i++) {
      random += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    
    setBillNumber(`BT-${year}${month}${day}-${random}`);
  };

  const updateDateTime = () => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }));
    setCurrentTime(now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }));
  };

  useEffect(() => {
    generateBillNumber();
    updateDateTime();
    
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length >= 2) {
        searchProducts();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    const total = calculateTotal();
    if (paidAmount === 0) {
      setPaymentStatus('pending');
    } else if (paidAmount < total) {
      setPaymentStatus('partial');
    } else if (paidAmount >= total) {
      setPaymentStatus('paid');
    }
  }, [paidAmount, selectedProducts, discount, tax, discountType, taxType]);

  useEffect(() => {
    if (!manualDiscount) {
      if (customerType === 'internal') {
        setCustomerDiscount(10);
        setDiscount(10);
        setDiscountType('percentage');
      } else {
        setCustomerDiscount(0);
        setDiscount(0);
        setDiscountType('percentage');
      }
    }
  }, [customerType, manualDiscount]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
          box-shadow: none !important;
          background: transparent !important;
        }
        
        #billPaper, #billPaper * {
          visibility: visible !important;
          background: white !important;
          border: none !important;
          box-shadow: none !important;
          outline: none !important;
        }
        
        #billPaper {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 280px !important;
          margin: 0 !important;
          padding: 12px !important;
          border: none !important;
          box-shadow: none !important;
          background: white !important;
        }
        
        #billPaper div,
        #billPaper span,
        #billPaper p,
        #billPaper h1,
        #billPaper h2,
        #billPaper h3,
        #billPaper table,
        #billPaper tr,
        #billPaper td,
        #billPaper th {
          border: none !important;
          box-shadow: none !important;
          outline: none !important;
          background: white !important;
        }
        
        #billPaper .bill-header {
          border-bottom: 1px dashed #000 !important;
        }
        
        #billPaper .bill-info {
          border-top: 1px dashed #000 !important;
          border-bottom: 1px dashed #000 !important;
        }
        
        #billPaper .bill-items-header {
          border-bottom: 1px solid #000 !important;
        }
        
        #billPaper .bill-item {
          border-bottom: 1px dotted #000 !important;
        }
        
        #billPaper .bill-summary {
          border-top: 1px solid #000 !important;
        }
        
        #billPaper .bill-footer {
          border-top: 1px dashed #000 !important;
        }
        
        #billPaper * {
          background: white !important;
          color: black !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        #billPaper input,
        #billPaper select,
        #billPaper button,
        #billPaper .no-print {
          display: none !important;
        }
        
        #billPaper .payment-section {
          display: none !important;
        }
        
        #billPaper .customer-section input,
        #billPaper .customer-section select,
        #billPaper .customer-section button {
          display: none !important;
        }
        
        #billPaper .customer-section {
          border: none !important;
          padding: 0 !important;
          margin: 10px 0 !important;
        }
        
        #billPaper .discount-section {
          display: none !important;
        }
        
        @page {
          size: 80mm auto !important;
          margin: 0 !important;
        }
        
        .no-print {
          display: none !important;
        }
      }
      
      @media screen {
        #billPaper input,
        #billPaper select,
        #billPaper button {
          display: block;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    setShowPaymentDetails(true);
    switch(paymentMethod) {
      case 'cash':
        setCardNumber('');
        setCardHolderName('');
        setUpiId('');
        setTransactionId('');
        setBankName('');
        setChequeNumber('');
        break;
      case 'card':
        setCashReceived(0);
        setUpiId('');
        setTransactionId('');
        setBankName('');
        setChequeNumber('');
        break;
      case 'upi':
        setCashReceived(0);
        setCardNumber('');
        setCardHolderName('');
        setBankName('');
        setChequeNumber('');
        break;
      case 'cheque':
        setCashReceived(0);
        setCardNumber('');
        setCardHolderName('');
        setUpiId('');
        setTransactionId('');
        break;
      default:
        break;
    }
  }, [paymentMethod]);

  const fetchCustomerByPhone = async (phone) => {
    if (phone.length < 10) return;
    
    setFetchingCustomer(true);
    try {
      const response = await api.get(`/billing/customer/${phone}`);
      if (response.data && response.data.exists) {
        const customer = response.data.customer;
        setCustomerName(customer.name || 'Walk-in Customer');
        setCustomerEmail(customer.email || '');
        setCustomerAddress(customer.address || '');
        setCustomerGST(customer.gst || '');
        setCustomerType(customer.type || 'external');
        setSuccess('Customer found! Details auto-filled.');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error fetching customer:', err);
    } finally {
      setFetchingCustomer(false);
    }
  };

  useEffect(() => {
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length === 10) {
      fetchCustomerByPhone(cleanPhone);
    }
  }, [customerPhone]);

  // ================= EXISTING PRODUCT FUNCTIONS =================
  const searchProducts = async () => {
    if (!isAuthenticated) return;
    
    setSearchLoading(true);
    setError('');
    
    try {
      const response = await api.get(`/billing/search-products?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data);
    } catch (err) {
      console.error('Search error:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else {
        setError(err.response?.data?.error || 'Failed to search products');
      }
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const getProductByBarcode = async () => {
    if (!isAuthenticated) return;
    if (!barcode.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await api.get(`/billing/product/barcode/${barcode}`);
      addProductToBill(response.data);
      setBarcode('');
    } catch (err) {
      console.error('Barcode error:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
      } else {
        setError(err.response?.data?.error || 'Product not found');
      }
    } finally {
      setLoading(false);
    }
  };

  const addProductToBill = (product) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    
    if (existingProduct) {
      if (existingProduct.quantity < product.quantity) {
        const updatedProducts = selectedProducts.map(p =>
          p.id === product.id
            ? { 
                ...p, 
                quantity: p.quantity + 1, 
                total: (p.quantity + 1) * p.sellPrice 
              }
            : p
        );
        setSelectedProducts(updatedProducts);
        setSuccess(`Added another ${product.name}`);
        setTimeout(() => setSuccess(''), 2000);
      } else {
        setError(`Insufficient stock! Max available: ${product.quantity}`);
        setTimeout(() => setError(''), 3000);
      }
    } else {
      if (product.quantity > 0) {
        setSelectedProducts([
          ...selectedProducts,
          {
            id: product.id,
            name: product.name,
            model: product.model || '',
            sellPrice: product.sellPrice,
            quantity: 1,
            total: product.sellPrice,
            maxQuantity: product.quantity
          }
        ]);
        setSuccess(`${product.name} added to bill`);
        setTimeout(() => setSuccess(''), 2000);
      } else {
        setError('Out of stock!');
        setTimeout(() => setError(''), 3000);
      }
    }
    
    setSearchQuery('');
    setSearchResults([]);
  };

  const updateQuantity = (productId, newQuantity) => {
    const product = selectedProducts.find(p => p.id === productId);
    
    if (product) {
      newQuantity = parseInt(newQuantity) || 0;
      
      if (newQuantity >= 0 && newQuantity <= product.maxQuantity) {
        const updatedProducts = selectedProducts.map(p =>
          p.id === productId
            ? { ...p, quantity: newQuantity, total: newQuantity * p.sellPrice }
            : p
        );
        setSelectedProducts(updatedProducts);
        
        if (newQuantity === 0) {
          setSuccess(`${product.name} quantity set to 0`);
        } else {
          setSuccess(`Updated ${product.name} quantity`);
        }
        setTimeout(() => setSuccess(''), 2000);
      } else if (newQuantity > product.maxQuantity) {
        setError(`Invalid quantity! Max available: ${product.maxQuantity}`);
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const removeProduct = (productId) => {
    const product = selectedProducts.find(p => p.id === productId);
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
    setSuccess(`${product.name} removed from bill`);
    setTimeout(() => setSuccess(''), 2000);
  };

  // ================= NEW GOLD/SILVER ITEM FUNCTIONS =================
  const addGoldSilverItem = () => {
    if (!currentGoldSilverItem.itemName.trim()) {
      setError('Please enter item name');
      return;
    }
    
    if (currentGoldSilverItem.grossWeight <= 0) {
      setError('Please enter valid gross weight');
      return;
    }
    
    if (currentGoldSilverItem.netWeight <= 0) {
      setError('Please enter valid net weight');
      return;
    }
    
    setGoldSilverItems([...goldSilverItems, { 
      ...currentGoldSilverItem, 
      id: Date.now() 
    }]);
    
    setCurrentGoldSilverItem({
      itemName: '',
      code: '',
      grossWeight: 0,
      stoneWeight: 0,
      netWeight: 0,
      purity: 91,
      margin: 0,
      grossAmount: 0,
      netAmount: 0,
    });
    
    setError('');
  };

  const removeGoldSilverItem = (id) => {
    setGoldSilverItems(goldSilverItems.filter(item => item.id !== id));
  };

  const updateGoldSilverItem = (field, value) => {
    setCurrentGoldSilverItem(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const updateGoldSilverItemString = (field, value) => {
    setCurrentGoldSilverItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ================= EXISTING CALCULATION FUNCTIONS =================
  const calculateSubtotal = () => {
    return selectedProducts
      .filter(p => p.quantity > 0)
      .reduce((sum, p) => sum + p.total, 0);
  };

  const calculateDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    if (subtotal === 0) return 0;
    
    if (discountType === 'percentage') {
      return (subtotal * discount) / 100;
    }
    return Math.min(discount, subtotal);
  };

  const calculateTaxAmount = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscountAmount();
    const afterDiscount = subtotal - discountAmount;
    
    if (afterDiscount <= 0) return 0;
    
    if (taxType === 'percentage') {
      return (afterDiscount * tax) / 100;
    }
    return Math.min(tax, afterDiscount);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscountAmount();
    const taxAmount = calculateTaxAmount();
    return Math.max(0, subtotal - discountAmount + taxAmount);
  };

  const calculateChange = () => {
    const total = calculateTotal();
    return Math.max(0, paidAmount - total);
  };

  const calculateDue = () => {
    const total = calculateTotal();
    return Math.max(0, total - paidAmount);
  };

  // ================= EXISTING HANDLERS =================
  const handleDiscountChange = (value) => {
    setManualDiscount(true);
    const numValue = parseFloat(value) || 0;
    const subtotal = calculateSubtotal();
    
    if (discountType === 'percentage') {
      if (numValue > 100) {
        setError('Percentage discount cannot exceed 100%');
        setDiscount(100);
      } else if (numValue < 0) {
        setDiscount(0);
      } else {
        setDiscount(numValue);
      }
    } else {
      if (numValue > subtotal) {
        setError('Fixed discount cannot exceed subtotal');
        setDiscount(subtotal);
      } else if (numValue < 0) {
        setDiscount(0);
      } else {
        setDiscount(numValue);
      }
    }
    
    setTimeout(() => setError(''), 3000);
  };

  const handleDiscountTypeChange = (type) => {
    setManualDiscount(true);
    const subtotal = calculateSubtotal();
    setDiscountType(type);
    
    if (type === 'percentage') {
      if (discountType === 'fixed' && subtotal > 0) {
        const percentage = (discount / subtotal) * 100;
        setDiscount(Math.min(100, Math.round(percentage * 100) / 100));
      } else if (discount > 100) {
        setDiscount(100);
      }
    } else {
      if (discountType === 'percentage' && subtotal > 0) {
        const fixed = (subtotal * discount) / 100;
        setDiscount(Math.min(subtotal, Math.round(fixed * 100) / 100));
      } else if (discount > subtotal) {
        setDiscount(subtotal);
      }
    }
  };

  const resetDiscountToDefault = () => {
    setManualDiscount(false);
    if (customerType === 'internal') {
      setDiscount(10);
      setDiscountType('percentage');
    } else {
      setDiscount(0);
      setDiscountType('percentage');
    }
  };

  const handleCashPayment = (received) => {
    const amount = parseFloat(received) || 0;
    setCashReceived(amount);
    setPaidAmount(amount);
  };

  const handleExactPayment = () => {
    const total = calculateTotal();
    setPaidAmount(total);
    if (paymentMethod === 'cash') {
      setCashReceived(total);
    }
  };

  // ================= MODIFIED SAVE BILL FUNCTION =================
  const saveBillToDatabase = async () => {
    const activeProducts = selectedProducts.filter(p => p.quantity > 0);
    const hasGoldSilverItems = goldSilverItems.length > 0;
    
    if (activeProducts.length === 0 && !hasGoldSilverItems) {
      setError('No items to save!');
      return null;
    }

    setLoading(true);
    setError('');

    try {
      const billData = {
        customerName: customerName,
        customerPhone: customerPhone,
        customerEmail: customerEmail,
        customerGST: customerGST,
        customerAddress: customerAddress,
        customerType: customerType === 'internal' ? 'internal' : 'regular',
        vehicleName: vehicleName,
        vehicleNumber: vehicleNumber,
        companyId: selectedCompany?.id,
        discount: discount,
        discountType: discountType === 'percentage' ? 'percentage' : 'amount',
        tax: tax,
        taxType: taxType === 'percentage' ? 'percentage' : 'amount',
        paidAmount: paidAmount,
        paymentMethod: paymentMethod,
        createdBy: JSON.parse(localStorage.getItem('user'))?.id,
        createdByName: createdBy,
        items: activeProducts.map(p => ({
          productId: p.id,
          quantity: p.quantity
        })),
        billDate: billDate,
        goldRate: goldRate,
        silverRate: silverRate,
        customerAlternateContact: customerContact,
        previousBillsCount: 0,
        grade: '',
        remarks: '',
        itemType: itemType,
        goldSilverItems: goldSilverItems.map(item => ({
          itemName: item.itemName,
          code: item.code || '',
          grossWeight: item.grossWeight,
          stoneWeight: item.stoneWeight,
          netWeight: item.netWeight,
          purity: item.purity,
          margin: item.margin,
          grossAmount: item.grossAmount,
          netAmount: item.netAmount,
        })),
        grossAmountTotal: grossAmountTotal,
        totalDeductions: totalDeductions,
        netPayableAmount: netPayableAmount,
        paymentMode: paymentMode,
        amountPaid: amountPaid,
        bankPendingAmount: bankPendingAmount,
        pledgeOption: pledgeOption,
        releaseSource: releaseSource,
        idProof: idProof,
        addressProof: addressProof,
        pledgeCopy: pledgeCopy,
        receipt: receipt,
        declarationAccepted: declarationAccepted,
        customerId: customerId,
        billId: billId,
        amountInWords: amountInWords,
      };

      console.log('Saving bill with gold/silver items:', billData);

      const response = await api.post('/billing/bills', billData);

      if (response.data.success) {
        setSuccess('Bill saved successfully!');
        setSavedBillId(response.data.billId);
        setBillNumber(response.data.billNumber);
        setLastGeneratedBill({
          billNumber: response.data.billNumber,
          customerPhone: customerPhone,
          customerName: customerName
        });
        setShowWhatsApp(true);
        setBillSaved(true);
        
        return {
          billId: response.data.billId,
          billNumber: response.data.billNumber
        };
      } else {
        throw new Error(response.data.error || 'Failed to save bill');
      }
    } catch (err) {
      console.error('Save bill error:', err);
      setError(err.response?.data?.error || err.message || 'Failed to save bill');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATED PRINT FUNCTION =================
  const handlePrint = async () => {
    const subtotal = calculateSubtotal();
    if (subtotal === 0 && goldSilverItems.length === 0) {
      setError('No items to print!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const savedData = await saveBillToDatabase();
    
    if (savedData) {
      setShowPrintModal(true);
    }
  };

  // ================= DOWNLOAD BILL FUNCTION =================
  const downloadBill = () => {
    const subtotal = calculateSubtotal();
    if (subtotal === 0 && goldSilverItems.length === 0) {
      setError('No items to download!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const billHTML = generateBillHTML();
    const blob = new Blob([billHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Bill_${billNumber.replace(/[\/\\]/g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSuccess('Bill downloaded successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handlePaymentComplete = async () => {
    const subtotal = calculateSubtotal();
    if (subtotal === 0 && goldSilverItems.length === 0) {
      setError('No items in bill!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const savedData = await saveBillToDatabase();
    
    if (savedData) {
      downloadBill();
    }
  };

  // ================= LEGACY GENERATE BILL HTML (preserved) =================
  const generateBillHTML = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscountAmount();
    const taxAmount = calculateTaxAmount();
    const total = calculateTotal();
    const due = calculateDue();
    const change = calculateChange();
    const activeProducts = selectedProducts.filter(p => p.quantity > 0);

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bill - ${billNumber}</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              margin: 0;
              padding: 20px;
              width: 80mm;
              font-family: 'Courier New', monospace;
              font-size: 11px;
              line-height: 1.3;
              background: white;
            }
            
            #billPaper {
              width: 280px;
              margin: 0 auto;
              padding: 12px;
              background: white;
            }
            
            .bill-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .bill-logo {
              max-width: 120px;
              max-height: 60px;
              margin-bottom: 5px;
              object-fit: contain;
            }
            .bill-header h1 {
              font-size: 16px;
              letter-spacing: 1px;
              margin-bottom: 3px;
              color: #333;
              font-weight: bold;
            }
            
            .bill-header .owner {
              font-size: 10px;
              font-weight: bold;
              color: #333;
              margin: 2px 0;
            }
            
            .bill-header p {
              font-size: 9px;
              color: #666;
              margin: 1px 0;
              line-height: 1.2;
            }
            
            .bill-info {
              margin: 10px 0;
              padding: 6px 0;
              border-top: 1px dashed #000;
              border-bottom: 1px dashed #000;
            }
            
            .bill-info-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 2px;
              font-size: 10px;
            }
            
            .bill-number {
              font-weight: bold;
              color: #007bff;
            }
            
            .customer-section {
              margin: 10px 0;
              padding: 8px;
              background: #f9f9f9;
              border-radius: 2px;
              border: 1px solid #e9ecef;
            }
            
            .customer-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 4px;
              font-size: 10px;
            }
            
            .customer-label {
              font-weight: bold;
              color: #555;
            }
            
            .customer-value {
              color: #333;
              max-width: 180px;
              text-align: right;
            }
            
            .customer-type-badge {
              padding: 2px 6px;
              border-radius: 3px;
              font-size: 9px;
              font-weight: bold;
              text-transform: uppercase;
            }
            
            .internal-badge {
              background: #cce5ff;
              color: #004085;
            }
            
            .external-badge {
              background: #fff3cd;
              color: #856404;
            }
            
            .vehicle-section {
              margin: 8px 0;
              padding: 6px;
              background: #f0f0f0;
              border-radius: 2px;
              border: 1px solid #ddd;
            }
            
            .vehicle-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 4px;
              font-size: 10px;
            }
            
            .bill-items {
              margin: 10px 0;
            }
            
            .bill-items-header {
              display: grid;
              grid-template-columns: 2fr 1fr 1fr 1.5fr;
              font-weight: bold;
              padding: 4px 0;
              border-bottom: 1px solid #000;
              font-size: 10px;
              background: #f0f0f0;
              padding-left: 2px;
            }
            
            .bill-item {
              display: grid;
              grid-template-columns: 2fr 1fr 1fr 1.5fr;
              padding: 3px 0;
              border-bottom: 1px dotted #ccc;
              font-size: 9px;
              padding-left: 2px;
            }
            
            .bill-item-empty {
              text-align: center;
              color: #999;
              padding: 10px;
              font-style: italic;
              font-size: 10px;
            }
            
            .bill-item-name {
              display: flex;
              flex-direction: column;
            }
            
            .bill-item-small {
              font-size: 7px;
              color: #666;
            }
            
            .bill-summary {
              margin: 10px 0;
              padding: 8px 0;
              border-top: 1px solid #000;
            }
            
            .summary-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 3px;
              font-size: 10px;
            }
            
            .summary-row-total {
              font-weight: bold;
              font-size: 12px;
              border-top: 1px dashed #000;
              padding-top: 6px;
              margin-top: 6px;
              color: #333;
            }
            
            .payment-section {
              margin: 10px 0;
              padding: 8px;
              background: #f0f0f0;
              border-radius: 2px;
              border: 1px solid #ddd;
              font-size: 10px;
            }
            
            .payment-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 4px;
              align-items: center;
            }
            
            .bill-footer {
              text-align: center;
              margin-top: 15px;
              padding-top: 10px;
              border-top: 1px dashed #000;
              font-size: 8px;
            }
            
            .bill-footer p {
              margin-bottom: 2px;
              color: #666;
            }
            
            .change-amount {
              font-weight: bold;
              color: ${paidAmount >= total ? '#28a745' : '#dc3545'};
              font-size: 10px;
            }
            
            .created-by {
              margin-top: 8px;
              padding-top: 5px;
              border-top: 1px dotted #ccc;
              font-size: 8px;
              text-align: center;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div id="billPaper">
            <div class="bill-header">
              <img src="/avva-logo.jpeg" class="bill-logo" alt="Avva Inventory Logo">
              <h1>${shopDetails.name}</h1>
              <p>${shopDetails.address}</p>
              <p>${shopDetails.city}</p>
              ${shopDetails.phone ? `<p>Ph: ${shopDetails.phone}</p>` : ''}
              ${shopDetails.gst ? `<p>GST: ${shopDetails.gst}</p>` : ''}
            </div>
            
            <div class="bill-info">
              <div class="bill-info-row">
                <span>Bill No:</span>
                <span class="bill-number">${billNumber}</span>
              </div>
              <div class="bill-info-row">
                <span>Date:</span>
                <span>${currentDate}</span>
              </div>
              <div class="bill-info-row">
                <span>Time:</span>
                <span>${currentTime}</span>
              </div>
            </div>
            
            <div class="customer-section">
              <div class="customer-row">
                <span class="customer-label">Customer Type:</span>
                <span class="customer-type-badge ${customerType === 'internal' ? 'internal-badge' : 'external-badge'}">
                  ${customerType === 'internal' ? '🏢 INTERNAL' : '👤 EXTERNAL'}
                </span>
              </div>
              
              <div class="customer-row">
                <span class="customer-label">Name:</span>
                <span class="customer-value">${customerName}</span>
              </div>
              
              ${customerPhone ? `
              <div class="customer-row">
                <span class="customer-label">Phone:</span>
                <span class="customer-value">${customerPhone}</span>
              </div>
              ` : ''}
              
              ${customerEmail ? `
              <div class="customer-row">
                <span class="customer-label">Email:</span>
                <span class="customer-value">${customerEmail}</span>
              </div>
              ` : ''}
              
              ${customerAddress ? `
              <div class="customer-row">
                <span class="customer-label">Address:</span>
                <span class="customer-value">${customerAddress}</span>
              </div>
              ` : ''}
              
              ${customerGST ? `
              <div class="customer-row">
                <span class="customer-label">GST:</span>
                <span class="customer-value">${customerGST}</span>
              </div>
              ` : ''}
            </div>
            
            ${(vehicleName || vehicleNumber) ? `
            <div class="vehicle-section">
              <div class="vehicle-row">
                <span class="customer-label">Vehicle:</span>
                <span class="customer-value">${vehicleName || ''}</span>
              </div>
              ${vehicleNumber ? `
              <div class="vehicle-row">
                <span class="customer-label">Vehicle No:</span>
                <span class="customer-value">${vehicleNumber}</span>
              </div>
              ` : ''}
            </div>
            ` : ''}
            
            ${discount > 0 ? `
            <div class="discount-section">
              <div class="discount-amount">
                Discount Amount: -₹${discountAmount.toFixed(2)}
                ${!manualDiscount && customerType === 'internal' ? ' (Staff discount)' : ''}
              </div>
            </div>
            ` : ''}
            
            <div class="bill-items">
              <div class="bill-items-header">
                <span>Item</span>
                <span>Price</span>
                <span>Qty</span>
                <span>Total</span>
              </div>
              <div>
                ${activeProducts.length === 0 ? `
                  <div class="bill-item-empty">
                    <span>--- No items in bill ---</span>
                  </div>
                ` : activeProducts.map(product => `
                  <div class="bill-item">
                    <span class="bill-item-name">
                      ${product.name.length > 12 ? product.name.substring(0, 10) + '...' : product.name}
                      ${product.model ? `<small class="bill-item-small">${product.model}</small>` : ''}
                    </span>
                    <span>₹${product.sellPrice}</span>
                    <span>${product.quantity}</span>
                    <span>₹${product.total.toFixed(2)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <div class="bill-summary">
              <div class="summary-row">
                <span>Subtotal:</span>
                <span>₹${subtotal.toFixed(2)}</span>
              </div>
              
              ${discount > 0 ? `
              <div class="summary-row">
                <span>Discount (${discount}${discountType === 'percentage' ? '%' : '₹'}):</span>
                <span>-₹${discountAmount.toFixed(2)}</span>
              </div>
              ` : ''}
              
              <div class="summary-row">
                <span>After Discount:</span>
                <span>₹${(subtotal - discountAmount).toFixed(2)}</span>
              </div>
              
              ${tax > 0 ? `
              <div class="summary-row">
                <span>Tax (${tax}${taxType === 'percentage' ? '%' : '₹'}):</span>
                <span>+₹${taxAmount.toFixed(2)}</span>
              </div>
              ` : ''}
              
              <div class="summary-row summary-row-total">
                <span>Total:</span>
                <span>₹${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div class="payment-section">
              <div class="payment-row">
                <span>Payment Method:</span>
                <span>${paymentMethod.toUpperCase()}</span>
              </div>
              
              <div class="payment-row">
                <span>Paid Amount:</span>
                <span>₹${paidAmount.toFixed(2)}</span>
              </div>
              
              <div class="payment-row">
                <span>Payment Status:</span>
                <span style="color: ${paymentStatus === 'paid' ? '#28a745' : paymentStatus === 'partial' ? '#ffc107' : '#dc3545'}; font-weight: bold;">
                  ${paymentStatus.toUpperCase()}
                </span>
              </div>
              
              ${due > 0 && paymentStatus !== 'pending' ? `
              <div class="payment-row">
                <span>Due Amount:</span>
                <span>₹${due.toFixed(2)}</span>
              </div>
              ` : ''}
              
              ${paymentMethod === 'cash' && paidAmount >= total ? `
              <div class="payment-row">
                <span>Change:</span>
                <span class="change-amount">₹${change.toFixed(2)}</span>
              </div>
              ` : ''}
            </div>
            
            <div class="bill-footer">
              <p>Thank you for your purchase!</p>
              <p>Goods once sold not returnable</p>
              <p>** Computer generated bill **</p>
              ${paymentMethod !== 'cash' && transactionId ? `
              <p>${paymentMethod.toUpperCase()}: ${transactionId}</p>
              ` : ''}
              <div class="created-by">
                Bill created by: ${createdBy}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const handleWhatsAppShare = () => {
    if (!customerPhone) {
      setError('Please enter customer phone number to share via WhatsApp');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const whatsappNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscountAmount();
    const taxAmount = calculateTaxAmount();
    const total = calculateTotal();
    const due = calculateDue();
    const activeProducts = selectedProducts.filter(p => p.quantity > 0);

    let message = `*${shopDetails.name}*\n`;
    message += `${shopDetails.address}\n`;
    message += `${shopDetails.city}\n`;
    if (shopDetails.phone) message += `Ph: ${shopDetails.phone}\n`;
    message += `Bill No: ${billNumber}\n`;
    message += `Date: ${currentDate} ${currentTime}\n`;
    message += `Customer: ${customerName}\n`;
    message += `Type: ${customerType === 'internal' ? 'INTERNAL' : 'EXTERNAL'}\n`;
    if (vehicleName) message += `Vehicle: ${vehicleName}\n`;
    if (vehicleNumber) message += `Vehicle No: ${vehicleNumber}\n`;
    
    if (goldSilverItems.length > 0) {
      message += `\n--- GOLD/SILVER ITEMS ---\n`;
      goldSilverItems.forEach(item => {
        message += `${item.itemName}: ${item.netWeight}g × ₹${itemType === 'gold' ? goldRate : silverRate} = ₹${item.grossAmount.toFixed(2)}\n`;
      });
      message += `Gross Total: ₹${grossAmountTotal.toFixed(2)}\n`;
      message += `Deductions: ₹${totalDeductions.toFixed(2)}\n`;
      message += `Net Payable: ₹${netPayableAmount.toFixed(2)}\n`;
    }
    
    if (activeProducts.length > 0) {
      message += `\n--- PRODUCT ITEMS ---\n`;
      activeProducts.forEach(p => {
        message += `${p.name.substring(0, 15)}... ${p.quantity}x ₹${p.sellPrice} = ₹${p.total.toFixed(2)}\n`;
      });
      message += `Subtotal: ₹${subtotal.toFixed(2)}\n`;
      if (discountAmount > 0) message += `Discount: -₹${discountAmount.toFixed(2)}\n`;
      if (taxAmount > 0) message += `Tax: +₹${taxAmount.toFixed(2)}\n`;
      message += `Total: ₹${total.toFixed(2)}\n`;
    }
    
    if (activeProducts.length > 0 && goldSilverItems.length > 0) {
      const combinedTotal = total + netPayableAmount;
      message += `\n*GRAND TOTAL: ₹${combinedTotal.toFixed(2)}*\n`;
    }
    
    message += `================\n`;
    message += `Payment: ${paymentMethod.toUpperCase()}\n`;
    message += `Paid: ₹${paidAmount.toFixed(2)}\n`;
    message += `Status: ${paymentStatus.toUpperCase()}\n`;
    if (due > 0) message += `Due: ₹${due.toFixed(2)}\n`;
    message += `================\n`;
    message += `Thank you for shopping with us!\n`;
    message += `Goods once sold not returnable\n`;
    message += `Created by: ${createdBy}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    setSuccess('WhatsApp opened with bill details!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const clearBill = () => {
    if (window.confirm('Clear all items?')) {
      setSelectedProducts([]);
      setGoldSilverItems([]);
      setCustomerName('Walk-in Customer');
      setCustomerPhone('');
      setCustomerEmail('');
      setCustomerGST('');
      setCustomerAddress('S14 PHASE 1 JAINS AASHIYANA FLATS VEMBULI AMMAN KOVIL STREET KALAIGNAR KARUNANIDHI NAGAR, CHENNAI 600078');
      setCustomerType('external');
      setCustomerDiscount(0);
      setVehicleName('');
      setVehicleNumber('');
      setDiscount(0);
      setDiscountType('percentage');
      setManualDiscount(false);
      setTax(0);
      setTaxType('percentage');
      setPaidAmount(0);
      setCashReceived(0);
      setPaymentMethod('cash');
      setPaymentStatus('pending');
      setCardNumber('');
      setCardHolderName('');
      setUpiId('');
      setTransactionId('');
      setBankName('');
      setChequeNumber('');
      setGoldRate(13900);
      setSilverRate(0);
      setCustomerContact('');
      setAmountPaid(0);
      setBankPendingAmount(0);
      setPledgeOption('physical');
      setReleaseSource('RELEASE');
      setShowReleaseSource(true);
      setIdProof('691706578736');
      setAddressProof('691706578736');
      setPledgeCopy('');
      setReceipt('');
      setDeclarationAccepted(true);
      setAmountInWords('ZERO RUPEES ONLY');
      setGrossAmountTotal(0);
      setTotalDeductions(0);
      setNetPayableAmount(0);
      setGrandTotalWeight(0);
      setGrandTotalStoneWax(0);
      setGrandTotalNetWeight(0);
      setGrandTotalPurity('0%');
      setGrandTotalAmount(0);
      setError('');
      setSuccess('');
      setBillSaved(false);
      setShowWhatsApp(false);
      setLastGeneratedBill(null);
      setSavedBillId(null);
      generateBillNumber();
    }
  };

  const handleNewBill = () => {
    clearBill();
  };

  const handleBarcodeKeyPress = (e) => {
    if (e.key === 'Enter') {
      getProductByBarcode();
    }
  };

  const testAPIConnection = async () => {
    try {
      const response = await api.get('/health');
      console.log('API Health:', response.data);
    } catch (err) {
      console.error('API Health Check Failed:', err);
    }
  };

  useEffect(() => {
    testAPIConnection();
  }, []);

  const activeProducts = selectedProducts.filter(p => p.quantity > 0);
  const subtotal = calculateSubtotal();
  const discountAmount = calculateDiscountAmount();
  const taxAmount = calculateTaxAmount();
  const total = calculateTotal();
  const due = calculateDue();
  const change = calculateChange();

  const dynamicStyles = {
    changeAmount: {
      fontWeight: 'bold',
      color: paidAmount >= total ? '#28a745' : '#dc3545',
      fontSize: '10px',
    },
    zeroQuantity: {
      opacity: 0.5,
      background: '#fff3cd',
    }
  };

  // ================= RENDER =================
  if (!isAuthenticated) {
    return (
      <div style={{...baseStyles.container, justifyContent: 'center', alignItems: 'center'}}>
        <div style={{background: 'white', padding: '40px', borderRadius: '10px', textAlign: 'center'}}>
          <h2>🔒 Authentication Required</h2>
          <p style={{color: '#dc3545', margin: '20px 0'}}>{error || 'Please login to access billing'}</p>
          <button 
            style={{...baseStyles.btn, ...baseStyles.btnPrimary, padding: '10px 30px'}}
            onClick={() => window.location.href = '/login'}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setCustomerPhone(value);
    }
  };

  // Prepare bill data for the print modal - ALL DATA IS DYNAMIC FROM FORM
  const getBillDataForPrint = () => {
    // Map gold/silver items to the format expected by OmGoldenBill
    const items = goldSilverItems.length > 0 
      ? goldSilverItems.map(item => ({
          ornamentType: item.itemName || '',
          code: item.code || '',
          grossWeight: item.grossWeight || 0,
          stoneWax: item.stoneWeight || 0,
          netWeight: item.netWeight || 0,
          purity: item.purity || 91,
          grossAmount: Math.round(item.grossAmount) || 0,
        }))
      : [{ 
          ornamentType: '', 
          code: '', 
          grossWeight: 0, 
          stoneWax: 0, 
          netWeight: 0, 
          purity: 0, 
          grossAmount: 0 
        }];

    return {
      customerId: customerId || '0033',
      dateTime: `${currentDate} ${currentTime}`,
      customerName: customerName || 'Walk-in Customer',
      billId: billId || '954454',
      contact: customerContact || customerPhone || '9790835880',
      goldPrice: goldRate.toString() || '13900',
      address: customerAddress || 'S14 PHASE 1 JAINS AASHIYANA FLATS VEMBULI AMMAN KOVIL STREET KALAIGNAR KARUNANIDHI NAGAR, CHENNAI 600078',
      idProof: idProof || '691706578736',
      addressProof: addressProof || '691706578736',
      items: items,
      grandTotal: {
        grossWeight: grandTotalWeight || 0,
        stoneWax: grandTotalStoneWax || 0,
        netWeight: grandTotalNetWeight || 0,
        purity: grandTotalPurity || '0%',
        grossAmount: grandTotalAmount || 0,
      },
      grossAmount: grossAmountTotal || 0,
      margin: totalDeductions || 0,
      netAmount: netPayableAmount || 0,
      release: releaseSource || 'RELEASE',
      amountPaid: amountPaid || 0,
      amountInWords: amountInWords || 'ZERO RUPEES ONLY',
    };
  };

  const getShopDataForPrint = () => {
    return {
      branch: shopDetails.branch || 'Chennai - Peravallur, Perambur',
      contact: shopDetails.phone || '8189920414',
      gst: shopDetails.gst || '33COUPR9413J1Z8',
      address: shopDetails.address || '177A papermills road, peravallur, chennai 600082',
    };
  };

  // Check if there are any items to print
  const hasItemsToPrint = activeProducts.length > 0 || goldSilverItems.length > 0;

  return (
    <div style={baseStyles.container}>
      {/* Left Panel - Product Selection */}
      <div style={baseStyles.productPanel} className="no-print">
        <h2 style={baseStyles.productPanelTitle}>🧾 Create New Bill</h2>
        
        {/* Company Selector */}
        {companies.length > 0 && (
          <div style={baseStyles.companySelector}>
            <div 
              style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
              onClick={() => setShowCompanySelector(!showCompanySelector)}
            >
              <span>
                🏢 <span style={baseStyles.companyName}>
                  {selectedCompany ? selectedCompany.name : 'Select Company'}
                </span>
              </span>
              <span style={{fontSize: '12px'}}>{showCompanySelector ? '▲' : '▼'}</span>
            </div>
            {showCompanySelector && (
              <div style={baseStyles.companyDropdown}>
                {companies.map(company => (
                  <div
                    key={company.id}
                    style={baseStyles.companyOption}
                    onClick={() => handleCompanySelect(company)}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f0f7ff'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {company.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {error && (
          <div style={{...baseStyles.alert, ...baseStyles.alertError}}>
            ⚠️ {error}
          </div>
        )}
        
        {success && (
          <div style={{...baseStyles.alert, ...baseStyles.alertSuccess}}>
            ✅ {success}
          </div>
        )}
        
        {/* ================= EXISTING SEARCH SECTION ================= */}
        <div style={baseStyles.searchSection}>
          <div style={baseStyles.searchBox}>
            <label style={baseStyles.searchLabel}>🔍 Search Products:</label>
            <input
              type="text"
              style={baseStyles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type product name or model..."
              autoComplete="off"
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            {searchLoading && <div style={baseStyles.searchLoading}>Searching...</div>}
          </div>
          
          <div style={baseStyles.barcodeInput}>
            <input
              type="text"
              style={baseStyles.barcodeField}
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              onKeyPress={handleBarcodeKeyPress}
              placeholder="📱 Scan barcode..."
              onFocus={(e) => e.target.style.borderColor = '#28a745'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            <button
              style={{
                ...baseStyles.barcodeButton,
                ...(loading ? baseStyles.barcodeButtonDisabled : {})
              }}
              onClick={getProductByBarcode}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
          
          {searchResults.length > 0 && (
            <div style={baseStyles.searchResults}>
              {searchResults.map(product => (
                <div
                  key={product.id}
                  style={baseStyles.searchResultItem}
                  onClick={() => addProductToBill(product)}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f0f7ff'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={baseStyles.resultInfo}>
                    <div style={baseStyles.resultName}>{product.name}</div>
                    <div style={baseStyles.resultDetails}>
                      {product.model || ''} | Stock: {product.quantity}
                    </div>
                  </div>
                  <div style={baseStyles.resultPrice}>₹{product.sellPrice}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= NEW GOLD/SILVER SECTION ================= */}
        <div style={baseStyles.goldSilverSection}>
          <h3 style={{fontSize: '14px', marginBottom: '10px', color: '#333'}}>
            🥇🥈 Gold / Silver Items
          </h3>
          
          {/* Gold/Silver Toggle */}
          <div style={baseStyles.goldSilverToggle}>
            <button
              style={{
                ...baseStyles.toggleBtn,
                ...(itemType === 'gold' ? baseStyles.toggleBtnActive : {})
              }}
              onClick={() => setItemType('gold')}
            >
              🥇 Gold
            </button>
            <button
              style={{
                ...baseStyles.toggleBtn,
                ...(itemType === 'silver' ? baseStyles.toggleBtnActive : {})
              }}
              onClick={() => setItemType('silver')}
            >
              🥈 Silver
            </button>
          </div>

          {/* Rates Display */}
          <div style={{display: 'flex', gap: '15px', marginBottom: '10px', fontSize: '12px'}}>
            <div>
              <label style={{fontSize: '10px', color: '#666'}}>Gold Rate: </label>
              <input
                type="number"
                style={{...baseStyles.smallInput, width: '80px', display: 'inline-block'}}
                value={goldRate}
                onChange={(e) => setGoldRate(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label style={{fontSize: '10px', color: '#666'}}>Silver Rate: </label>
              <input
                type="number"
                style={{...baseStyles.smallInput, width: '80px', display: 'inline-block'}}
                value={silverRate}
                onChange={(e) => setSilverRate(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Item Entry Row - Updated to allow manual entry for Net Wt and Gross Amt */}
          <div style={baseStyles.goldSilverItemRow}>
            <div>
              <label style={{fontSize: '8px', color: '#666'}}>Item Name</label>
              <input
                type="text"
                style={baseStyles.smallInput}
                value={currentGoldSilverItem.itemName}
                onChange={(e) => updateGoldSilverItemString('itemName', e.target.value)}
                placeholder="e.g. BANGLES 3"
              />
            </div>
            <div>
              <label style={{fontSize: '8px', color: '#666'}}>Code</label>
              <input
                type="text"
                style={baseStyles.smallInput}
                value={currentGoldSilverItem.code}
                onChange={(e) => updateGoldSilverItemString('code', e.target.value)}
                placeholder="Code"
              />
            </div>
            <div>
              <label style={{fontSize: '8px', color: '#666'}}>Gross Wt</label>
              <input
                type="number"
                style={baseStyles.smallInput}
                value={currentGoldSilverItem.grossWeight || ''}
                onChange={(e) => updateGoldSilverItem('grossWeight', e.target.value)}
                placeholder="g"
                step="0.001"
              />
            </div>
            <div>
              <label style={{fontSize: '8px', color: '#666'}}>Stone/Wax</label>
              <input
                type="number"
                style={baseStyles.smallInput}
                value={currentGoldSilverItem.stoneWeight || ''}
                onChange={(e) => updateGoldSilverItem('stoneWeight', e.target.value)}
                placeholder="g"
                step="0.001"
              />
            </div>
            <div>
              <label style={{fontSize: '8px', color: '#666'}}>Net Wt</label>
              <input
                type="number"
                style={baseStyles.smallInput}
                value={currentGoldSilverItem.netWeight || ''}
                onChange={(e) => updateGoldSilverItem('netWeight', e.target.value)}
                placeholder="g"
                step="0.001"
              />
            </div>
            <div>
              <label style={{fontSize: '8px', color: '#666'}}>Purity %</label>
              <input
                type="number"
                style={baseStyles.smallInput}
                value={currentGoldSilverItem.purity || ''}
                onChange={(e) => updateGoldSilverItem('purity', e.target.value)}
                placeholder="91"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label style={{fontSize: '8px', color: '#666'}}>Gross Amt</label>
              <input
                type="text"
                style={baseStyles.readOnlyInput}
                value={Math.round(currentGoldSilverItem.grossAmount).toLocaleString() || '0'}
                readOnly
              />
            </div>
            <div>
              <button
                style={{...baseStyles.btn, ...baseStyles.btnSuccess, padding: '4px 8px', fontSize: '10px'}}
                onClick={addGoldSilverItem}
              >
                Add
              </button>
            </div>
          </div>

          {/* Gold/Silver Items List */}
          {goldSilverItems.length > 0 && (
            <div style={{marginTop: '10px', overflowX: 'auto'}}>
              <div style={baseStyles.goldSilverItemHeader}>
                <span>Item</span>
                <span>Code</span>
                <span>Gross</span>
                <span>Stone</span>
                <span>Net</span>
                <span>Purity</span>
                <span>Gross Amt</span>
                <span>Action</span>
              </div>
              {goldSilverItems.map(item => (
                <div key={item.id} style={baseStyles.goldSilverItemRow}>
                  <span style={{fontSize: '11px'}}>{item.itemName}</span>
                  <span style={{fontSize: '11px'}}>{item.code || '-'}</span>
                  <span style={{fontSize: '11px'}}>{item.grossWeight.toFixed(1)}</span>
                  <span style={{fontSize: '11px'}}>{item.stoneWeight.toFixed(1)}</span>
                  <span style={{fontSize: '11px'}}>{item.netWeight.toFixed(1)}</span>
                  <span style={{fontSize: '11px'}}>{item.purity}%</span>
                  <span style={{fontSize: '11px'}}>₹{Math.round(item.grossAmount).toLocaleString()}</span>
                  <button
                    style={{...baseStyles.btn, ...baseStyles.btnDanger, padding: '2px 6px', fontSize: '10px'}}
                    onClick={() => removeGoldSilverItem(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Gold/Silver Totals */}
          {(goldSilverItems.length > 0 || grossAmountTotal > 0) && (
            <div style={baseStyles.goldSilverTotals}>
              <div style={baseStyles.totalRow}>
                <span>Gross Amount Total:</span>
                <span>₹{Math.round(grossAmountTotal).toLocaleString()}</span>
              </div>
              <div style={baseStyles.totalRow}>
                <span>Total Deductions:</span>
                <span>₹{Math.round(totalDeductions).toLocaleString()}</span>
              </div>
              <div style={{...baseStyles.totalRow, ...baseStyles.totalRowBold}}>
                <span>Net Payable Amount:</span>
                <span style={{color: '#28a745'}}>₹{Math.round(netPayableAmount).toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* ================= EXISTING PRODUCT ITEMS ================= */}
        <div style={baseStyles.selectedProducts}>
          <h3 style={baseStyles.selectedProductsTitle}>
            🛒 Current Bill Items ({activeProducts.length} active / {selectedProducts.length} total)
          </h3>
          <div style={baseStyles.selectedItemsList}>
            {selectedProducts.length === 0 ? (
              <p style={baseStyles.noItems}>No items added yet. Search or scan products to add.</p>
            ) : (
              selectedProducts.map(product => (
                <div 
                  key={product.id} 
                  style={{
                    ...baseStyles.selectedItem,
                    ...(product.quantity === 0 ? dynamicStyles.zeroQuantity : {})
                  }}
                >
                  <div style={baseStyles.itemInfo}>
                    <span style={baseStyles.itemName}>{product.name}</span>
                    {product.model && (
                      <span style={baseStyles.itemModel}>{product.model}</span>
                    )}
                    {product.quantity === 0 && (
                      <span style={{fontSize: '9px', color: '#856404'}}>(Zero quantity)</span>
                    )}
                  </div>
                  <div style={baseStyles.itemPrice}>₹{product.sellPrice}</div>
                  <input
                    type="number"
                    style={baseStyles.itemQuantity}
                    value={product.quantity}
                    min="0"
                    max={product.maxQuantity}
                    onChange={(e) => updateQuantity(product.id, e.target.value)}
                  />
                  <div style={baseStyles.itemTotal}>₹{product.total.toFixed(2)}</div>
                  <button
                    style={baseStyles.removeBtn}
                    onClick={() => removeProduct(product.id)}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#c82333'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#dc3545'}
                    title="Remove completely"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
          {selectedProducts.length > 0 && (
            <p style={{fontSize: '11px', color: '#666', marginTop: '10px', textAlign: 'center'}}>
              💡 Set quantity to 0 to keep item in list (will not be billed)
            </p>
          )}
        </div>
      </div>
      
      {/* ================= RIGHT PANEL - BILL ================= */}
      <div style={baseStyles.billPanel} className="no-print">
        <div style={baseStyles.billContainer}>
          <div 
            style={baseStyles.billPaper} 
            id="billPaper" 
            ref={billPaperRef}
          >
            <div className="bill-header">
              <img src="/m3-logo.png" alt="OM Golden Buyers Logo" style={{ maxWidth: '100px', marginBottom: '5px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
              <h1 style={baseStyles.billHeaderH1}>{shopDetails.name}</h1>
              <p style={baseStyles.billHeaderP}>{shopDetails.address}</p>
              <p style={baseStyles.billHeaderP}>{shopDetails.city}</p>
              {shopDetails.phone && <p style={baseStyles.billHeaderP}>Ph: {shopDetails.phone}</p>}
              {shopDetails.gst && <p style={baseStyles.billHeaderP}>GST: {shopDetails.gst}</p>}
            </div>
            
            <div className="bill-info">
              <div style={baseStyles.billInfoRow}>
                <span>Bill No:</span>
                <span style={baseStyles.billNumber}>{billNumber}</span>
              </div>
              <div style={baseStyles.billInfoRow}>
                <span>Date:</span>
                <span>{currentDate}</span>
              </div>
              <div style={baseStyles.billInfoRow}>
                <span>Time:</span>
                <span>{currentTime}</span>
              </div>
            </div>
            
            <div className="customer-section">
              <div style={baseStyles.customerRow}>
                <span style={baseStyles.customerLabel}>Customer Type:</span>
                <span 
                  style={{
                    ...baseStyles.customerTypeBadge,
                    ...(customerType === 'internal' ? baseStyles.internalBadge : baseStyles.externalBadge)
                  }}
                >
                  {customerType === 'internal' ? '🏢 INTERNAL' : '👤 EXTERNAL'}
                </span>
              </div>
              
              <div style={baseStyles.customerRow}>
                <span style={baseStyles.customerLabel}>Name:</span>
                <span style={baseStyles.customerValue}>{customerName}</span>
              </div>
              
              {customerPhone && (
                <div style={baseStyles.customerRow}>
                  <span style={{...baseStyles.customerLabel, color: '#007bff'}}>Phone Number:</span>
                  <span style={baseStyles.customerValue}>{customerPhone}</span>
                </div>
              )}
              
              {customerEmail && (
                <div style={baseStyles.customerRow}>
                  <span style={baseStyles.customerLabel}>Email:</span>
                  <span style={baseStyles.customerValue}>{customerEmail}</span>
                </div>
              )}
              
              {customerAddress && (
                <div style={baseStyles.customerRow}>
                  <span style={baseStyles.customerLabel}>Address:</span>
                  <span style={baseStyles.customerValue}>{customerAddress}</span>
                </div>
              )}
              
              {customerGST && (
                <div style={baseStyles.customerRow}>
                  <span style={baseStyles.customerLabel}>GST:</span>
                  <span style={baseStyles.customerValue}>{customerGST}</span>
                </div>
              )}
            </div>
            
            {(vehicleName || vehicleNumber) && (
              <div style={{margin: '5px 0', padding: '3px', background: '#f0f0f0', fontSize: '9px'}} className="no-print-visible">
                <div><strong>Vehicle:</strong> {vehicleName || '-'}</div>
                {vehicleNumber && <div><strong>Reg No:</strong> {vehicleNumber}</div>}
              </div>
            )}
            
            <div style={baseStyles.customerSection} className="no-print">
              <select
                style={baseStyles.customerTypeSelect}
                value={customerType}
                onChange={(e) => {
                  setCustomerType(e.target.value);
                  setManualDiscount(false);
                }}
              >
                <option value="external">👤 External Customer</option>
                <option value="internal">🏢 Internal (Staff)</option>
              </select>
              
              <input
                type="text"
                style={baseStyles.customerInput}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
              />
              
              <input
                type="text"
                style={{
                  ...baseStyles.customerInput,
                  borderColor: fetchingCustomer ? '#007bff' : '#ddd',
                  background: fetchingCustomer ? '#f0f7ff' : 'white'
                }}
                value={customerPhone}
                onChange={handlePhoneChange}
                placeholder={fetchingCustomer ? "Searching..." : "Phone Number"}
                maxLength="10"
              />
              
              <input
                type="email"
                style={baseStyles.customerInput}
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Email Address"
              />
              
              <input
                type="text"
                style={baseStyles.customerInput}
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Address"
              />
              
              <input
                type="text"
                style={baseStyles.customerInput}
                value={customerGST}
                onChange={(e) => setCustomerGST(e.target.value)}
                placeholder="GST Number (if applicable)"
              />
            </div>
            
            {/* Discount Section */}
            <div style={baseStyles.discountSection} className="no-print">
              <div 
                style={baseStyles.discountHeader}
                onClick={() => setShowDiscountInput(!showDiscountInput)}
              >
                <span style={baseStyles.discountTitle}>
                  {manualDiscount ? '✏️ Manual Discount' : '💰 Default Discount'}
                </span>
                <span style={baseStyles.discountToggle}>
                  {showDiscountInput ? '▼' : '▶'}
                </span>
              </div>
              
              {showDiscountInput && (
                <div style={baseStyles.discountControls}>
                  <select
                    style={baseStyles.discountTypeSelect}
                    value={discountType}
                    onChange={(e) => handleDiscountTypeChange(e.target.value)}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                  
                  <input
                    type="number"
                    style={baseStyles.discountInput}
                    value={discount}
                    onChange={(e) => handleDiscountChange(e.target.value)}
                    min="0"
                    max={discountType === 'percentage' ? 100 : subtotal}
                    step={discountType === 'percentage' ? '1' : '0.01'}
                    placeholder={discountType === 'percentage' ? 'Enter %' : 'Enter amount'}
                  />
                </div>
              )}
              
              <div style={baseStyles.discountAmount}>
                Discount Amount: -₹{discountAmount.toFixed(2)}
                {!manualDiscount && customerType === 'internal' && (
                  <span style={{fontSize: '8px', marginLeft: '5px', color: '#666'}}>
                    (Staff discount)
                  </span>
                )}
              </div>
              
              {manualDiscount && (
                <button
                  style={{
                    ...baseStyles.btn,
                    ...baseStyles.btnSecondary,
                    fontSize: '9px',
                    padding: '2px 5px',
                    marginTop: '5px',
                    width: '100%'
                  }}
                  onClick={resetDiscountToDefault}
                >
                  Reset to Default
                </button>
              )}
            </div>
            
            <div className="bill-items">
              <div className="bill-items-header">
                <span>Item</span>
                <span>Price</span>
                <span>Qty</span>
                <span>Total</span>
              </div>
              <div>
                {activeProducts.length === 0 ? (
                  <div style={baseStyles.billItemEmpty}>
                    <span>--- No items in bill ---</span>
                  </div>
                ) : (
                  activeProducts.map(product => (
                    <div key={product.id} className="bill-item">
                      <span style={baseStyles.billItemName}>
                        {product.name.length > 12 
                          ? product.name.substring(0, 10) + '...' 
                          : product.name
                        }
                        {product.model && (
                          <small style={baseStyles.billItemSmall}>{product.model}</small>
                        )}
                      </span>
                      <span>₹{product.sellPrice}</span>
                      <span>{product.quantity}</span>
                      <span>₹{product.total.toFixed(2)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div className="bill-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="summary-row">
                  <span>
                    Discount 
                    {discount > 0 && (
                      <span style={{fontSize: '8px', color: '#666'}}>
                        {' '}({discount}{discountType === 'percentage' ? '%' : '₹'})
                      </span>
                    )}:
                  </span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="summary-row">
                <span>After Discount:</span>
                <span>₹{(subtotal - discountAmount).toFixed(2)}</span>
              </div>
              
              {tax > 0 && (
                <div className="summary-row">
                  <span>
                    Tax 
                    {tax > 0 && (
                      <span style={{fontSize: '8px', color: '#666'}}>
                        {' '}({tax}{taxType === 'percentage' ? '%' : '₹'})
                      </span>
                    )}:
                  </span>
                  <span>+₹{taxAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="summary-row summary-row-total">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="payment-section">
              <div style={baseStyles.paymentRow}>
                <span>Payment Method:</span>
                <select
                  style={baseStyles.paymentSelect}
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="cash">💵 Cash</option>
                  <option value="card">💳 Card</option>
                  <option value="upi">📱 UPI</option>
                  <option value="cheque">📝 Cheque</option>
                  <option value="mixed">🔄 Mixed</option>
                </select>
              </div>
              
              {showPaymentDetails && (
                <div style={baseStyles.paymentDetails}>
                  {paymentMethod === 'cash' && (
                    <>
                      <div style={baseStyles.paymentRow}>
                        <span>Cash Received:</span>
                        <input
                          type="number"
                          style={baseStyles.paymentInput}
                          value={cashReceived}
                          onChange={(e) => handleCashPayment(e.target.value)}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div style={baseStyles.paymentRow}>
                        <span>Change:</span>
                        <span style={dynamicStyles.changeAmount}>₹{change.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  
                  {paymentMethod === 'card' && (
                    <>
                      <input
                        type="text"
                        style={baseStyles.paymentDetailsInput}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number (last 4 digits)"
                        maxLength="4"
                      />
                      <input
                        type="text"
                        style={baseStyles.paymentDetailsInput}
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                        placeholder="Card Holder Name"
                      />
                      <input
                        type="text"
                        style={baseStyles.paymentDetailsInput}
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="Transaction ID"
                      />
                    </>
                  )}
                  
                  {paymentMethod === 'upi' && (
                    <>
                      <input
                        type="text"
                        style={baseStyles.paymentDetailsInput}
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="UPI ID"
                      />
                      <input
                        type="text"
                        style={baseStyles.paymentDetailsInput}
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="Transaction ID"
                      />
                    </>
                  )}
                  
                  {paymentMethod === 'cheque' && (
                    <>
                      <input
                        type="text"
                        style={baseStyles.paymentDetailsInput}
                        value={chequeNumber}
                        onChange={(e) => setChequeNumber(e.target.value)}
                        placeholder="Cheque Number"
                      />
                      <input
                        type="text"
                        style={baseStyles.paymentDetailsInput}
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="Bank Name"
                      />
                    </>
                  )}
                  
                  {paymentMethod === 'mixed' && (
                    <div style={{fontSize: '9px', color: '#666'}}>
                      <p>Mixed payment - Please enter details in POS</p>
                    </div>
                  )}
                </div>
              )}
              
              <div style={baseStyles.paymentRow}>
                <span>Paid Amount:</span>
                <input
                  type="number"
                  style={baseStyles.paymentInput}
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div style={baseStyles.paymentRow}>
                <span>Payment Status:</span>
                <span style={{
                  color: paymentStatus === 'paid' ? '#28a745' : 
                         paymentStatus === 'partial' ? '#ffc107' : '#dc3545',
                  fontWeight: 'bold'
                }}>
                  {paymentStatus.toUpperCase()}
                </span>
              </div>
              
              {due > 0 && paymentStatus !== 'pending' && (
                <div style={baseStyles.paymentRow}>
                  <span>Due Amount:</span>
                  <span>₹{due.toFixed(2)}</span>
                </div>
              )}
              
              <button
                style={{
                  ...baseStyles.btn,
                  ...baseStyles.btnSecondary,
                  width: '100%',
                  marginTop: '5px',
                  padding: '5px'
                }}
                onClick={handleExactPayment}
              >
                Exact Amount
              </button>
            </div>
            
            <div className="bill-footer">
              <p style={baseStyles.billFooterP}>Thank you for your purchase!</p>
              <p style={baseStyles.billFooterP}>Goods once sold not returnable</p>
              <p style={baseStyles.billFooterP}>** Computer generated bill **</p>
              {paymentMethod !== 'cash' && transactionId && (
                <p style={baseStyles.billFooterP}>
                  {paymentMethod.toUpperCase()}: {transactionId}
                </p>
              )}
              <div style={{marginTop: '5px', paddingTop: '3px', borderTop: '1px dotted #ccc', fontSize: '8px', color: '#666'}}>
                Bill created by: {createdBy}
              </div>
            </div>
          </div>
          
          <div style={baseStyles.actionButtons} className="no-print">
            <button
              style={{
                ...baseStyles.btn,
                ...baseStyles.btnPrimary,
                ...(loading || !hasItemsToPrint ? baseStyles.btnDisabled : {})
              }}
              onClick={handlePrint}
              disabled={loading || !hasItemsToPrint}
            >
              {loading ? '⏳ Saving...' : '🖨️ Print'}
            </button>
            <button
              style={{
                ...baseStyles.btn,
                ...baseStyles.btnSuccess,
                ...(loading || !hasItemsToPrint ? baseStyles.btnDisabled : {})
              }}
              onClick={handlePaymentComplete}
              disabled={loading || !hasItemsToPrint}
            >
              {loading ? '⏳ Saving...' : '💰 Pay & Download'}
            </button>
            <button
              style={{
                ...baseStyles.btn,
                ...baseStyles.btnInfo,
                ...(loading ? baseStyles.btnDisabled : {})
              }}
              onClick={handleNewBill}
              disabled={loading}
            >
              🆕 New
            </button>
            <button
              style={{
                ...baseStyles.btn,
                ...baseStyles.btnDanger,
                ...(loading ? baseStyles.btnDisabled : {})
              }}
              onClick={clearBill}
              disabled={loading}
            >
              🗑️ Clear
            </button>
          </div>

          {showWhatsApp && lastGeneratedBill && (
            <button
              style={baseStyles.whatsappButton}
              onClick={handleWhatsAppShare}
              onMouseEnter={(e) => e.currentTarget.style.background = '#128C7E'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#25D366'}
            >
              <span>📱</span>
              Share Bill on WhatsApp to {customerPhone || 'Customer'}
            </button>
          )}

          {billSaved && (
            <p style={{fontSize: '10px', color: '#28a745', textAlign: 'center', marginTop: '5px'}}>
              ✓ Bill saved to database
            </p>
          )}
        </div>
      </div>
      
      <a ref={downloadLinkRef} style={baseStyles.downloadLink}></a>

      {/* Print Modal */}
      {showPrintModal && (
        <div style={baseStyles.printModalOverlay}>
          <div style={baseStyles.printModalContent}>
            <button 
              style={baseStyles.printModalClose}
              onClick={() => setShowPrintModal(false)}
            >
              ×
            </button>
            <div ref={printModalRef}>
              <OmGoldenBill 
                bill={getBillDataForPrint()} 
                shopDetails={getShopDataForPrint()} 
              />
            </div>
            <div style={{textAlign: 'center', marginTop: '10px'}}>
              <button 
                style={baseStyles.printModalButton}
                onClick={() => {
                  const printContent = printModalRef.current?.querySelector('div');
                  if (printContent) {
                    const win = window.open('', '_blank');
                    if (win) {
                      win.document.write(`
                        <!DOCTYPE html><html><head>
                        <title>Bill - ${billId}</title>
                        <style>
                          * { margin:0; padding:0; box-sizing:border-box; }
                          body { font-family: Arial, sans-serif; font-size:11px; color:#000; background:#fff; }
                          @page { size: A4; margin: 10mm; }
                          @media print {
                            body { padding: 0; margin: 0; }
                          }
                        </style>
                        </head><body>${printContent.innerHTML}</body></html>
                      `);
                      win.document.close();
                      win.focus();
                      setTimeout(() => { 
                        win.print(); 
                        win.close(); 
                      }, 400);
                    }
                  }
                }}
              >
                🖨️ Print Bill
              </button>
              <button 
                style={{...baseStyles.printModalButton, background: '#6c757d', marginLeft: '10px'}}
                onClick={() => setShowPrintModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bill;