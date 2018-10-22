'use strict';

const express = require('express');
const router = express.Router();
const tumblr = require('tumblr.js');

// tumblr
// mkMkpLp82BUSaXbc0Afiwrc4XMMTqMoDq72O8NlAdBsn4V3RmN
// secret
// 14pDHbHwMdxKSxJ9M7bNqk9F2fvP3R6uvJNOSAkE8UJJV9VDYa

// Authenticate via OAuth

// var client = tumblr.createClient({
//   consumer_key: 'mkMkpLp82BUSaXbc0Afiwrc4XMMTqMoDq72O8NlAdBsn4V3RmN',
//   consumer_secret: '14pDHbHwMdxKSxJ9M7bNqk9F2fvP3R6uvJNOSAkE8UJJV9VDYa',
//   token: 'ezRbEhFQQSxL6C5X2Nktt9F9fHOUsANfvFAjnJTvsp4Ixxig8L',
//   token_secret: 'XOyx1oY8pX6X7Hj3VX5wgA0zaX5keZAxoYRY5T8WfOtyyBcUcr'
// });

// SAMPLE TUMBLR OBJECT
// posts:
//    [ { type: 'text',
//        blog_name: 'linearsix',
//        blog: [Object],
//        id: 179250176753,
//        post_url: 'http://linearsix.tumblr.com/post/179250176753/aside-from-wiring-up-the-jacks-and-potentiometers',
//        slug: 'aside-from-wiring-up-the-jacks-and-potentiometers',
//        date: '2018-10-20 18:07:08 GMT',
//        timestamp: 1540058828,
//        state: 'published',
//        format: 'html',
//        reblog_key: 'ISd3sDJQ',
//        tags: [Array],
//        short_url: 'https://tmblr.co/Z746fq2cy9ABn',
//        summary: 'Aside from wiring up the jacks and potentiometers, that’s pretty much it for this prototype!',
//        is_blocks_post_format: true,
//        recommended_source: null,
//        recommended_color: null,
//        note_count: 0,
//        title: null,
//        body: '<figure class="tmblr-full" data-orig-height="960" data-orig-width="1280"><img src="https://66.media.tumblr.com/73c3a95660f7f6b697ffcaa8743a5556/tumblr_pgwszwvwHv1s88gv8_540.jpg" data-orig-height="960" data-orig-width="1280"/></figure><p>Aside from wiring up the jacks and potentiometers, that’s pretty much it for this prototype!</p>',
//        reblog: [Object],
//        trail: [Array],
//        can_like: false,
//        can_reblog: false,
//        can_send_in_message: true,
//        can_reply: false,
//        display_avatar: true },
//      { type: 'text',

// Authenticate via API Key
const client = tumblr.createClient({ consumer_key: 'mkMkpLp82BUSaXbc0Afiwrc4XMMTqMoDq72O8NlAdBsn4V3RmN' });

// render tumblr page
router.get('/tumblr', (req, res, next) => {

    // Make the request
    client.blogPosts('linearsix.tumblr.com', function (err, blogs) {
    // console.log(data.blog)
    
        let dataObj = blogs.posts;
        let selected_link = '';
        res.render('tumblr', { selected_link, dataObj });
    
    });
});

module.exports = router;