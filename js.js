document.addEventListener('DOMContentLoaded', () => {
    /*
     * autosize init
     */
    autosize(document.querySelectorAll('textarea'));

    /*
     * content
     */
    var tmp_ar = [];
    // document.querySelectorAll('.content .input-group-text').forEach(e => tmp_ar.push(e.offsetWidth));
    document.querySelectorAll('.content .input-group-text').forEach(e => tmp_ar.push(e.getBoundingClientRect().width));
    var $_content_input_group_text = Math.max.apply(null, tmp_ar);
    document.querySelectorAll('.content .input-group-text').forEach(e => e.style.width = $_content_input_group_text + 'px');

    /*
     * download button
     */
    $('#download').on('click', function() {
        var pdf, page_section, HTML_Width, HTML_Height, top_left_margin, PDF_Width, PDF_Height, canvas_image_width, canvas_image_height;
        var img_format = 'JPEG';

        function calculatePDF_height_width(selector, index) {
            page_section = $(selector).eq(index);
            HTML_Width = page_section.width();
            HTML_Height = page_section.height();
            top_left_margin = 15;

            PDF_Width = HTML_Width + (top_left_margin * 2);
            PDF_Height = HTML_Height + (top_left_margin * 2);
            
            canvas_image_width = HTML_Width;
            canvas_image_height = HTML_Height;
        }

        // Generate PDF
        function generatePDF() {
            // pdf = "";

            // // Button hide
            // $("#download").prop('disabled', true).text('Generating PDF ...');

            // html2canvas($("main.page").eq(0)[0], { allowTaint: true }).then(function (canvas) {

            //     document.body.appendChild(canvas);

            //     calculatePDF_height_width("main.page", 0);
            //     var imgData = canvas.toDataURL("image/png", 1.0);

            //     // console.log(imgData);

            //     pdf = new jspdf.jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
            //     pdf.addImage(imgData, img_format, top_left_margin, top_left_margin, HTML_Width, HTML_Height);

            // });

            // // html2canvas($(".print-wrap:eq(1)")[0], { allowTaint: true }).then(function (canvas) {

            // //     calculatePDF_height_width(".print-wrap", 1);
            // //     var imgData = canvas.toDataURL("image/png", 1.0);
            // //     pdf.addPage([PDF_Width, PDF_Height]);
            // //     pdf.addImage(imgData, img_format, top_left_margin, top_left_margin, HTML_Width, HTML_Height);

            // // });

            // html2canvas($("main.page").eq(1)[0], { allowTaint: true }).then(function (canvas) {

            //     calculatePDF_height_width("main.page", 1);
            //     var imgData = canvas.toDataURL("image/png", 1.0);
            //     pdf.addPage([PDF_Width, PDF_Height]);
            //     pdf.addImage(imgData, img_format, top_left_margin, top_left_margin, HTML_Width, HTML_Height);

            //     // console.log((page_section.length-1)+"==="+index);
            //     setTimeout(function () {

            //         // Get time
            //         var dateTime = Date.now();
            //         var timestamp = Math.floor(dateTime / 1000);

            //         // Save PDF Doc
            //         var PDF_NAME = "HTML-Document-" + timestamp + ".pdf";
            //         pdf.save(PDF_NAME);

            //         // Generate BLOB object
            //         var blob = pdf.output("blob");

            //         // Getting URL of blob object
            //         var blobURL = URL.createObjectURL(blob);

            //         // Button show
            //         $('#download').prop('disabled', false).text('Download with PDF');

            //     }, 0);
            // });

            // Debug
            html2canvas(document.querySelector("#page-1")).then(canvas => {
                document.body.appendChild(canvas);
            });
        };

        // Start generator
        generatePDF();
    });

    /*
     * parsing URL
     */
    var local_url = new URL(window.location.href);

    var load_script = document.createElement('script');
    load_script.type = 'text/javascript';
    load_script.charset = 'UTF-8';

    if (local_url.searchParams.has('rc')) {
        var local_url_sp_rc = local_url.searchParams.get('rc');

        // rc toggle button
        if (local_url_sp_rc == 7) {
            $('#rc-toggle').text('Switch to rc.1').on('click', function() { window.location.replace(local_url.origin + local_url.pathname + '?rc=1'); }).prop('disabled', false);
        } else {
            $('#rc-toggle').text('Switch to rc.7').on('click', function() { window.location.replace(local_url.origin + local_url.pathname + '?rc=7'); }).prop('disabled', false);
        }
    } else {
        var local_url_sp_rc = 7;
        $('#rc-toggle').text('Switch to rc.1').on('click', function() { window.location.replace(local_url.origin + local_url.pathname + '?rc=1'); }).prop('disabled', false);
    }

    load_script.src = 'libs/html2canvas-v1/rc.' + local_url_sp_rc + '/html2canvas.min.js';
    $('body').append(load_script);

    /*
     * loaded
     */
    document.querySelectorAll('.load-shell').forEach(e => e.classList.remove('load-shell'));
});
