/*===============================
=            GLOBALS            =
===============================*/
filepicker.setKey("A1jBeZwwiQvqb7X20ka21z");


/*====================================
=            ON DOM READY            =
====================================*/
$(function() {

    // Populate the wall!
    $.ajax({
        url: '/api/links',
        type: 'GET',
        success: function(data) {
            // Quick and dirty custom jQuery templating
            var template = $('template').html();
            $.each(data, function(index, value) {
                var imageBlock = template.replace(/{src}/g, value.url);
                $('.wall').prepend(imageBlock);
            });

        }
    });

});



/*=========================================
=            FILE PICKER STUFF            =
=========================================*/
$('#big-freaking-button').click(function() {

    // Settings
    filepicker.pick({
        mimetype: 'image/*', /* Images only */
        maxSize: 1024 * 1024 * 5, /* 5mb */
        imageMax: [1500, 1500], /* 1500x1500px */
        cropRatio: 1/1, /* Perfect squares */
        services: ['*'] /* From anywhere */
    }, function(blob) {

        // Returned stuff for example
        var filename = blob.filename;
        var url = blob.url;
        var id = blob.id;
        var isWriteable = blob.isWriteable;
        var mimetype = blob.mimetype;
        var size = blob.size;

        // Save to a database somewhere
        // Alternatively you can have filepicker do it for you: https://www.filepicker.com/documentation/storage/
        $.ajax({
            url: '/api/links',
            type: 'POST',
            data: {
                url: blob.url
            },
            success: function(data) {

                // Add it to the wall!

                // Quick and dirty template
                var template = $('template').html();
                var imageBlock = template.replace(/{src}/g, blob.url);
                $('.wall').prepend(imageBlock);


            }
        });

    });

});