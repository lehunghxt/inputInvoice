var openFile = function (event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;
        var data = convertXML2JSON(text);
        console.log(data);
        var nhaCungCap = $('#nhaCungCap').val();
        var objProcessed = '';
        try {
            var objProcessed = '';
            if (nhaCungCap == 'objVNPT') {
                objProcessed = processObject(data, objVNPT);
            }
            if (nhaCungCap == 'objVNPTinv') {
                objProcessed = processObject(data, objVNPTinv);
            }
            if (nhaCungCap == 'objSmartVas') {
                objProcessed = processObject(data, objSmartVas);
            }
            if (nhaCungCap == 'objSmartVas2') {
                objProcessed = processObject(data, objSmartVas2);
            }
            if (nhaCungCap == 'obj19') {
                objProcessed = processObject(data, obj19);
            }
            if (nhaCungCap == 'obj92') {
                objProcessed = processObject(data, obj92);
            }
            if (nhaCungCap == 'objFPT') {
                objProcessed = processObject(data, objFPT);
            }
            console.log('=================');
            console.log(objProcessed);
            console.log('=================');
            var handleDetail = processDetail(objProcessed);
            processInvoice(handleDetail);

            checkinv(text);
            $('#invoiceJson').val(JSON.stringify(handleDetail));
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "<span style='color:#F28C30'>Thông báo</span>",
                icon: 'warning',
                html: error.message,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
        }
    };
    reader.readAsText(input.files[0]);
};
function convertXML2JSON(data) {
    var xmlData = "";
    if (data !== null && data.trim().length !== 0) {
        try {
            xmlData = $.parseXML(data);
        } catch (e) {
            throw e;
        }
        var x2js = new X2JS();
        return JSON.stringify(x2js.xml2json(xmlData));
    }
}
const objFPT = {
    mainInfo: {
        DateofInvoice           : "invoice.invoiceData.submittedDate.__text",
        InvoiceNumber           : "invoice.invoiceData.invoiceNumber.__text",
        Symbol                  : "invoice.invoiceData.invoiceSeries.__text",
        TemptCode               : "invoice.invoiceData.templateCode.__text",
        ExchangeRate            : "invoice.invoiceData.exchangeRate.__text",
        MoneyCode               : "invoice.invoiceData.currencyCode.__text",
        PaymentTerm             : "invoice.invoiceData.payments.payment.paymentMethodName.__text",

        SellerCompanyName       : "invoice.invoiceData.sellerLegalName.__text",
        SellerTaxCode           : "invoice.invoiceData.sellerTaxCode.__text",
        SellerCompanyAddress    : "invoice.invoiceData.sellerAddressLine.__text",

        CompanyName             : "invoice.invoiceData.buyerLegalName.__text",
        CompanyTaxcode          : "invoice.invoiceData.buyerTaxCode.__text",
        CompanyAdd              : "invoice.invoiceData.buyerAddressLine.__text",
        DSHHDVu                 : "invoice.invoiceData.items.item",

        TotalMoneyNoTax         : "invoice.invoiceData.totalVATAmount.__text",
        Tax                     : "invoice.invoiceData.invoiceTaxBreakdowns.invoiceTaxBreakdown.vatPercentage.__text",
        MoneyTax                : "invoice.invoiceData.invoiceTaxBreakdowns.invoiceTaxBreakdown.vatTaxAmount.__text",

        TotalMoney              : "invoice.invoiceData.totalAmountWithVAT.__text",
        TextTotalMoney          : "invoice.invoiceData.totalAmountWithVATInWords.__text",

        
        SignedDate      : "invoice.invoiceData.signedDate.__text",
        Signature       : "invoice.Signature.KeyInfo.X509Data.X509Certificate",
    },
    infoDetail: {
        ProductName         : "itemName.__text",
        Unit                : "unitCode.__text",
        Number              : "quantity.__text",
        Price               : "unitPrice.__text",
        TotalMoney          : "itemTotalAmountWithoutVat.__text",
        Tax                 : "vatPercentage.__text",
        AmountTax           : "vatAmount.__text",
        TotalMoneyAfterTax  : "THANH_TIEN_SAU_CK.__text",
    }
}
const obj92 = {
    mainInfo: {
        DateofInvoice : "HDon.DLHDon.TTChung.NLap",
        InvoiceNumber : "HDon.DLHDon.TTChung.SHDon",
        Symbol        : "HDon.DLHDon.TTChung.KHHDon",
        TemptCode     : "HDon.DLHDon.TTChung.KHMSHDon",
        ExchangeRate  : "HDon.DLHDon.TTChung.TGia",
        MoneyCode     : "HDon.DLHDon.TTChung.DVTTe",
        PaymentTerm   : "HDon.DLHDon.TTChung.HTTToan",

        SellerCompanyName       : "HDon.DLHDon.NDHDon.NBan.Ten",
        SellerTaxCode           : "HDon.DLHDon.NDHDon.NBan.MST",
        SellerCompanyAddress    : "HDon.DLHDon.NDHDon.NBan.DChi",

        CompanyName     : "HDon.DLHDon.NDHDon.NMua.Ten",
        CompanyTaxcode  : "HDon.DLHDon.NDHDon.NMua.MST",
        CompanyAdd      : "HDon.DLHDon.NDHDon.NMua.DChi",
        DSHHDVu         : "HDon.DLHDon.NDHDon.DSHHDVu.HHDVu",

        TotalMoney      :"HDon.DLHDon.NDHDon.TToan.TgTTTBSo",
        TextTotalMoney  :"HDon.DLHDon.NDHDon.TToan.TgTTTBChu",

        SignedDate      : "HDon.DSCKS.NBan.Signature.Object.SignatureProperties.SignatureProperty.SigningTime",
        Signature       : "HDon.DSCKS.NBan.Signature.KeyInfo.X509Data.X509Certificate",
    },
    infoDetail: {
        ProductName         : "THHDVu",
        Unit                : "DVTinh",
        Number              : "SLuong",
        Price               : "DGia",
        TotalMoney          : "ThTien",
        Tax                 : "TSuat",
        //AmountTax           : "VATAmount",
        //TotalMoneyAfterTax  : "Amount",
    }
}
const obj19 = {
    mainInfo: {
        DateofInvoice : "HDon.DLHDon.TTChung.TDLap",
        InvoiceNumber : "HDon.DLHDon.TTChung.SHDon",
        Symbol        : "HDon.DLHDon.TTChung.KHHDon",
        TemptCode     : "HDon.DLHDon.TTChung.KHMSHDon",
        ExchangeRate  : "HDon.DLHDon.TTChung.TGia",
        MoneyCode     : "HDon.DLHDon.TTChung.DVTTe",
        PaymentTerm   : "HDon.DLHDon.TTKhac.TTin.DLieu",

        SellerCompanyName    : "HDon.DLHDon.NDHDon.NBan.Ten",
        SellerTaxCode        : "HDon.DLHDon.NDHDon.NBan.MST",
        SellerCompanyAddress : "HDon.DLHDon.NDHDon.NBan.DChi",

        CompanyName     : "HDon.DLHDon.NDHDon.NMua.Ten",
        CompanyTaxcode  : "HDon.DLHDon.NDHDon.NMua.MST",
        CompanyAdd      : "HDon.DLHDon.NDHDon.NMua.DChi",

        TotalMoneyNoTax : "HDon.DLHDon.NDHDon.TToan.TgTCThue",
        //Tax             : "HDon.DLHDon.NDHDon.TToan.THTTLTSuat.LTSuat.TSuat",
        MoneyTax        : "HDon.DLHDon.NDHDon.TToan.TgTThue",

        Products        : "HDon.DLHDon.NDHDon.DSHHDVu.HHDVu",
        TotalMoney      : "HDon.DLHDon.NDHDon.TToan.TgTTTBSo",
        TextTotalMoney  : "HDon.DLHDon.NDHDon.TToan.TgTTTBChu",

        SignedDate      : "HDon.DSCKS.NBan.Signature.Object.SignatureProperties.SignatureProperty.SigningTime",
        Signature       : "HDon.DSCKS.NBan.Signature.KeyInfo.X509Data.X509Certificate",
    },
    infoDetail: {
        ProductName         : "Ten",
        Unit                : "DVTinh",
        Number              : "SLuong",
        Price               : "DGia",
        TotalMoney          : "ThTien",
        Tax                 : "TSuat",
        //AmountTax           : "VATAmount",
        //TotalMoneyAfterTax  : "Amount",
    }
}
const objSmartVas = {
    mainInfo: {
        DateofInvoice : "HDon.DLHDon.TTChung.TDLap",
        InvoiceNumber : "HDon.DLHDon.TTChung.SHDon",
        Symbol        : "HDon.DLHDon.TTChung.KHHDon",
        TemptCode     : "HDon.DLHDon.TTChung.KHMSHDon",
        ExchangeRate  : "HDon.DLHDon.TTChung.TGia",
        MoneyCode     : "HDon.DLHDon.TTChung.DVTTe",
        PaymentTerm   : "HDon.DLHDon.TTKhac.TTin.DLieu",

        SellerCompanyName           : "HDon.DLHDon.NDHDon.NBan.Ten",
        SellerTaxCode        : "HDon.DLHDon.NDHDon.NBan.MST",
        SellerCompanyAddress : "HDon.DLHDon.NDHDon.NBan.DChi",

        CompanyName     : "HDon.DLHDon.NDHDon.NMua.Ten",
        CompanyTaxcode  : "HDon.DLHDon.NDHDon.NMua.MST",
        CompanyAdd      : "HDon.DLHDon.NDHDon.NMua.DChi",

        TotalMoneyNoTax : "HDon.DLHDon.NDHDon.TToan.TgTCThue",
        //Tax           : "HDon.DLHDon.NDHDon.TToan.TgTThue",
        MoneyTax        : "HDon.DLHDon.NDHDon.TToan.TgTThue",

        Products        : "HDon.DLHDon.NDHDon.DSHHDVu.HHDVu",
        TotalMoney      : "HDon.DLHDon.NDHDon.TToan.TgTTTBSo",
        TextTotalMoney  : "HDon.DLHDon.NDHDon.TToan.TgTTTBChu",

        SignedDate      : "HDon.DSCKS.NBan.Signature.Object.SignatureProperties.SignatureProperty.SigningTime",
        Signature       : "HDon.DSCKS.NBan.Signature.KeyInfo.X509Data.X509Certificate",
    },
    infoDetail: {
        ProductName         : "Ten",
        Unit                : "DVTinh",
        Number              : "SLuong",
        Price               : "DGia",
        TotalMoney          : "ThTien",
        Tax                 : "TSuat",
        AmountTax           : "VATAmount",
        TotalMoneyAfterTax  : "Amount",
    }
}
const objSmartVas2 = {
    mainInfo: {
        DateofInvoice : "HDon.DLHDon.TTChung.TDLap",
        InvoiceNumber : "HDon.DLHDon.TTChung.SHDon",
        Symbol        : "HDon.DLHDon.TTChung.KHHDon",
        TemptCode     : "HDon.DLHDon.TTChung.KHMSHDon",
        ExchangeRate  : "HDon.DLHDon.TTChung.TGia",
        MoneyCode     : "HDon.DLHDon.TTChung.DVTTe",
        //PaymentTerm   : "HDon.DLHDon.TTKhac.TTin.DLieu",

        SellerCompanyName           : "HDon.DLHDon.NDHDon.NBan.Ten",
        SellerTaxCode        : "HDon.DLHDon.NDHDon.NBan.MST",
        SellerCompanyAddress : "HDon.DLHDon.NDHDon.NBan.DChi",

        CompanyName     : "HDon.DLHDon.NDHDon.NMua.Ten",
        CompanyTaxcode  : "HDon.DLHDon.NDHDon.NMua.MST",
        CompanyAdd      : "HDon.DLHDon.NDHDon.NMua.DChi",

        TotalMoneyNoTax : "HDon.DLHDon.NDHDon.TToan.TgTCThue",
        //Tax           : "HDon.DLHDon.NDHDon.TToan.TgTThue",
        MoneyTax        : "HDon.DLHDon.NDHDon.TToan.TgTThue",

        Products        : "HDon.DLHDon.NDHDon.DSHHDVu.HHDVu",
        TotalMoney      : "HDon.DLHDon.NDHDon.TToan.TgTTTBSo",
        TextTotalMoney  : "HDon.DLHDon.NDHDon.TToan.TgTTTBChu",

        SignedDate      : "HDon.DSCKS.NBan.Signature.Object.SignatureProperties.SignatureProperty.date",
        Signature       : "HDon.DSCKS.NBan.Signature.KeyInfo.X509Data.X509Certificate",
    },
    infoDetail: {
        ProductName         : "Ten",
        Unit                : "DVTinh",
        Number              : "SLuong",
        Price               : "DGia",
        TotalMoney          : "ThTien",
        Tax                 : "TSuat",
        AmountTax           : "VATAmount",
        TotalMoneyAfterTax  : "Amount",
    }
}
const objVNPT = {
    mainInfo: {
        DateofInvoice       : "Invoice.Content.ArisingDate",
        InvoiceNumber       : "Invoice.Content.InvoiceNo",
        Symbol              : "Invoice.Content.SerialNo",
        TemptCode           : "Invoice.Content.InvoicePattern",
        ExchangeRate        : "Invoice.Content.ExchangeRate",
        MoneyCode           : "Invoice.Content.CurrencyUnit",
        PaymentTerm         : "Invoice.Content.PaymentMethod",

        SellerCompanyName       : "Invoice.Content.ComName",
        SellerTaxCode           : "Invoice.Content.ComTaxCode",
        SellerCompanyAddress    : "Invoice.Content.ComAddress",

        CompanyName         : "Invoice.Content.CusName",
        CompanyTaxcode      : "Invoice.Content.CusTaxCode",
        CompanyAdd          : "Invoice.Content.CusAddress",

        Products        : "Invoice.Content.Products.Product",

        TotalMoneyNoTax     : "Invoice.Content.Total",
        Tax                 : "Invoice.Content.VATRate",
        MoneyTax            : "Invoice.Content.VATAmount",

        TotalMoney      : "Invoice.Content.Amount",
        TextTotalMoney  : "Invoice.Content.AmountInWords",

        SignedDate        : "Invoice.Content.SignDate",
        Signature         : "Invoice.Signature.KeyInfo.X509Data.X509Certificate",
    },
    infoDetail: {
        ProductName         : "ProdName",
        Unit                : "ProdUnit",
        Number              : "ProdQuantity",
        Price               : "ProdPrice",
        TotalMoney          : "Total",
        TotalMoneyAfterTax  : "Amount",
    }
};
const objVNPTinv = {
    mainInfo: {
        DateofInvoice       : "Invoice.Content.ArisingDate",
        InvoiceNumber       : "Invoice.Content.InvoiceNo",
        Symbol              : "Invoice.Content.SerialNo",
        TemptCode           : "Invoice.Content.InvoicePattern",
        ExchangeRate        : "Invoice.Content.ExchangeRate",
        MoneyCode           : "Invoice.Content.CurrencyUnit",
        PaymentTerm         : "Invoice.Content.Kind_of_Payment",

        SellerCompanyName              : "Invoice.Content.ComName",
        SellerTaxCode           : "Invoice.Content.ComTaxCode",
        SellerCompanyAddress    : "Invoice.Content.ComAddress",

        CompanyName     : "Invoice.Content.CusName",
        CompanyTaxcode  : "Invoice.Content.CusTaxCode",
        CompanyAdd      : "Invoice.Content.CusAddress",
        Products        : "Invoice.Content.Products.Product",

        TotalMoneyNoTax  : "Invoice.Content.Total",
        Tax              : "Invoice.Content.VAT_Rate",
        MoneyTax         : "Invoice.Content.VAT_Amount",

        TotalMoney     : "Invoice.Content.Amount",
        TextTotalMoney : "Invoice.Content.Amount_words",

        SignedDate      : "Invoice.Content.SignDate",
        Signature       : "Invoice.Signature.KeyInfo.X509Data.X509Certificate",
        

    },
    infoDetail: {
        ProductName         : "ProdName",
        Unit                : "ProdUnit",
        Number              : "ProdQuantity",
        Price               : "ProdPrice",
        TotalMoney          : "Total",
        Tax                 : "VATRate",
        AmountTax           : "VATAmount",
        TotalMoneyAfterTax  : "Amount",
    }
}
function processObject(data, pathJson) {
    var mainInfo = pathJson.mainInfo;
    var infoDetail = pathJson.infoDetail;
    var dataInv = JSON.parse(data);
    var obj = {};
    var Details = [];
    for (let [key, value] of Object.entries(mainInfo)) {
        var level = value;
        level = level.split(".");
        var currentObjState = dataInv;
        for (var i = 0; i < level.length; i++) {
            currentObjState = currentObjState[level[i]];
        }
        if (typeof currentObjState == "string") {
            obj[`${key}`] = currentObjState;
        }
        if (typeof currentObjState == "object") {
            if (currentObjState.length > 0) {
                var tmpArr = [];
                currentObjState.forEach(element => {
                    var tmpDetail = {};
                    for (let [key, value] of Object.entries(infoDetail)) {
                        var val = value.split(".");
                        if(val.length > 1){
                            tmpDetail[`${key}`] = element[val[0]][val[1]];
                        }else{
                            tmpDetail[`${key}`] = element[value];
                        }
                    }
                    tmpDetail.Tax = tmpDetail.Tax ? parseInt(tmpDetail.Tax.split('%')[0]) : 0;
                    Details.push(tmpDetail);
                });
            } else {
                var detail2 = {};
                for (let [key, value] of Object.entries(infoDetail)) {
                    detail2[`${key}`] = currentObjState[value];
                }
                detail2.Tax = detail2.Tax ? parseInt(detail2.Tax.split('%')[0]) : 0;
                Details.push(detail2);
            }
        }
    }
    
    obj.Details = Details;
    return obj;
}
function InvoiceType(code) {
    return code.includes("01GTKT") ? "Hóa đơn giá trị gia tăng" : code.includes("02GTTT") ? "Hóa đơn bán hàng" : code.includes("03XKNB") ? "Phiếu xuất kho kiêm vận chuyển nội bộ" : "Hóa đơn khác"
}
function FormatMoney(amount, kytuNgan, kytuThapPhan) {
    if (!amount) return '';
    var num_parts = amount.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, kytuNgan || ",");
    if (num_parts.length > 1) return num_parts.join(kytuThapPhan || ".");
    return num_parts[0];
}
function handleMoney(money, roundNum = 2){
    return parseFloat(money).toFixed(roundNum);
}
function processDetail(obj){
    obj.DateofInvoice          = obj.DateofInvoice ? obj.DateofInvoice : '';
    obj.InvoiceNumber          = obj.InvoiceNumber ? obj.InvoiceNumber : '';
    obj.Symbol                 = obj.Symbol ? obj.Symbol : '';
    obj.TemptCode              = obj.TemptCode ? obj.TemptCode : '';
    obj.ExchangeRate           = obj.ExchangeRate ? obj.ExchangeRate : '';
    obj.MoneyCode              = obj.MoneyCode ? obj.MoneyCode : '';
    obj.PaymentTerm            = obj.PaymentTerm ? obj.PaymentTerm : '';
    obj.SellerCompanyName      = obj.SellerCompanyName ? obj.SellerCompanyName : '';
    obj.SellerTaxCode          = obj.SellerTaxCode ? obj.SellerTaxCode : '';
    obj.SellerCompanyAddress   = obj.SellerCompanyAddress ? obj.SellerCompanyAddress : '';
    obj.CompanyName            = obj.CompanyName ? obj.CompanyName : '';
    obj.CompanyTaxcode         = obj.CompanyTaxcode ? obj.CompanyTaxcode : '';
    obj.CompanyAdd             = obj.CompanyAdd ? obj.CompanyAdd : '';
    obj.TotalMoneyNoTax        = obj.TotalMoneyNoTax ? handleMoney(obj.TotalMoneyNoTax) : 0;
    obj.Tax                    = obj.Tax ? obj.Tax : '';
    obj.MoneyTax               = obj.MoneyTax ? handleMoney(obj.MoneyTax) : 0;
    obj.TotalMoney             = obj.TotalMoney ? handleMoney(obj.TotalMoney) : 0;
    obj.TextTotalMoney         = obj.TextTotalMoney ? obj.TextTotalMoney : '';
    
    obj.Details.forEach(item => {
        item.ProductName = item.ProductName ? item.ProductName : '';
        item.Unit = item.Unit ? item.Unit : '';
        item.Number = item.Number ? parseFloat(item.Number) : 0;
        item.Price = item.Price ? handleMoney(item.Price) : 0;
        item.TotalMoney = item.TotalMoney ? handleMoney(item.TotalMoney) : 0;
        item.Tax = item.Tax ? item.Tax : 0;
        item.AmountTax = item.AmountTax ? handleMoney(item.AmountTax) : 0;
        item.TotalMoneyAfterTax = item.TotalMoneyAfterTax ? handleMoney(item.TotalMoneyAfterTax) : 0;
        if(item.TotalMoney == 0 && item.Number > 0 && item.Price > 0){
            item.TotalMoney = handleMoney(parseFloat(item.Number)* parseFloat(item.Price));
        }
        if(item.TotalMoney > 0 && item.AmountTax == 0){
            item.AmountTax = handleMoney(parseFloat(item.TotalMoney) * parseFloat(item.Tax)/100.0);
        }
        if(item.TotalMoney > 0 && item.AmountTax > 0){
            item.TotalMoneyAfterTax = handleMoney(parseFloat(item.TotalMoney) + parseFloat(item.AmountTax));
        }
        if(obj.Tax != ''){
            item.Tax = obj.Tax;
        }
    });
    return obj;
}
function processInvoice(obj) {
    var rootDiv = $('#displayInfoInv');
    rootDiv.find('#THDon').text(InvoiceType(obj.TemptCode));
    rootDiv.find('#TemptCode').text(obj.TemptCode);
    rootDiv.find('#Symbol').text(obj.Symbol);
    rootDiv.find('#InvoiceNumber').text(obj.InvoiceNumber);
    rootDiv.find('#DateofInvoice').text(obj.DateofInvoice);

    rootDiv.find('#SellerCompanyName').text(obj.SellerCompanyName);
    rootDiv.find('#SellerTaxCode').text(obj.SellerTaxCode);
    rootDiv.find('#SellerCompanyAddress').text(obj.SellerCompanyAddress);

    rootDiv.find('#idSignedName').text(obj.SellerCompanyName);
    rootDiv.find('#idSignedTaxCode').text(obj.SellerTaxCode);
    rootDiv.find('#idSignedDate').text(obj.SignedDate);
    

    rootDiv.find('#CompanyName').text(obj.CompanyName);
    rootDiv.find('#CompanyTaxcode').text(obj.CompanyTaxcode);
    rootDiv.find('#CompanyAdd').text(obj.CompanyAdd);

    rootDiv.find('#ExchangeRate').text(obj.ExchangeRate);
    rootDiv.find('#MoneyCode').text(obj.MoneyCode);
    rootDiv.find('#PaymentTerm').text(obj.PaymentTerm);

    rootDiv.find('#TotalMoneyNoTax').text(FormatMoney(handleMoney(obj.TotalMoneyNoTax)));
    rootDiv.find('#Tax').text(handleDisplayTax(obj.Tax));
    rootDiv.find('#MoneyTax').text(FormatMoney(handleMoney(obj.MoneyTax)));
    rootDiv.find('#TotalMoney').text(FormatMoney(handleMoney(obj.TotalMoney)));
    rootDiv.find('#TextTotalMoney').text(obj.TextTotalMoney);

    var htmlDetail = '';
    var stt = 1;
    obj.Details.forEach((el) => {
        htmlDetail += `<tr>
                        <td class="tdCenter">${stt}</td>
                        <td class="tdLeft">${el.ProductName}</td>
                        <td class="tdCenter">${el.Unit}</td>
                        <td class="tdRight">${FormatMoney(handleMoney(el.Number))}</td>
                        <td class="tdRight">${FormatMoney(handleMoney(el.Price))}</td>
                        <td class="tdRight">${FormatMoney(handleMoney(el.TotalMoney))}</td>
                        <td class="tdCenter">${handleDisplayTax(el.Tax)}</td>
                        <td class="tdRight">${FormatMoney(handleMoney(el.AmountTax))}</td>
                        <td class="tdRight">${FormatMoney(handleMoney(el.TotalMoneyAfterTax)) }</td>
                        </tr>`;
        stt++;
    });
    rootDiv.find('#proDetail').html(htmlDetail);
    rootDiv.css('display', 'block');
}
function checkinv(text) {
    $.ajax({
        type: "POST",
        url: '../../Pages/User/Ajax/AjaxCheckInvoice.aspx/CheckSignInvoice',
        data: JSON.stringify({ Xml: text }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.d){
                $('#idValidInvoice').html('Hóa đơn không bị chỉnh sửa.');
                $('#idValidInvoice').css('color', 'green');
            }else{
                $('#idValidInvoice').html('Hóa đơn đã bị chỉnh sửa');
                $('#idValidInvoice').css('color', 'red');
            }
        }
    });
}

function handleDisplayTax(tax){
    var strRes = '';
    if(tax == -1 || tax == 'KCT'){
        strRes = 'KCT';
    }else if(tax == 0){
        strRes = '0%';
    }else if(tax == 5){
        strRes = '5%';
    }else if(tax == 10){
        strRes = '10%';
    }
    return strRes;
}
