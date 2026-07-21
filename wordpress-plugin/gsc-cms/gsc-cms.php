<?php
/**
 * Plugin Name: GSC CMS (Green Street Capital)
 * Description: Headless CMS API for the Green Street Capital Next.js site. Edit locations, specialties, homepage, and site settings in WordPress; auto-revalidate Next.js on save.
 * Version: 1.1.0
 * Author: Green Street Capital
 * Text Domain: gsc-cms
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit;
}

define('GSC_CMS_VERSION', '1.1.0');

/* -------------------------------------------------------------------------- */
/* Custom post types                                                          */
/* -------------------------------------------------------------------------- */

add_action('init', function () {
    register_post_type('gsc_location', [
        'labels' => [
            'name' => 'Locations',
            'singular_name' => 'Location',
            'add_new_item' => 'Add Location',
            'edit_item' => 'Edit Location',
            'search_items' => 'Search Locations',
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-location',
        'supports' => ['title'],
        'has_archive' => false,
        'rewrite' => false,
        'show_in_rest' => false,
    ]);

    register_post_type('gsc_specialty', [
        'labels' => [
            'name' => 'Specialties',
            'singular_name' => 'Specialty',
            'add_new_item' => 'Add Specialty',
            'edit_item' => 'Edit Specialty',
            'search_items' => 'Search Specialties',
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-portfolio',
        'supports' => ['title'],
        'has_archive' => false,
        'rewrite' => false,
        'show_in_rest' => false,
    ]);
});

/* -------------------------------------------------------------------------- */
/* Landing page meta                                                          */
/* -------------------------------------------------------------------------- */

function gsc_landing_meta_keys() {
    return [
        'gsc_slug' => '',
        'gsc_seo_title' => '',
        'gsc_seo_description' => '',
        'gsc_seo_keywords' => '',
        'gsc_hero_heading' => '',
        'gsc_hero_subheading' => '',
        'gsc_intro_heading' => '',
        'gsc_intro_paragraphs' => '',
        'gsc_intro_bullets' => '',
        'gsc_sidebar_heading' => '',
        'gsc_sidebar_body' => '',
        'gsc_sidebar_highlights' => '',
        'gsc_programs_heading' => '',
        'gsc_programs_json' => '[]',
        'gsc_market_heading' => '',
        'gsc_market_paragraphs' => '',
        'gsc_faqs_json' => '[]',
        'gsc_cta_heading' => '',
        'gsc_cta_body' => '',
    ];
}

function gsc_landing_field_help($key) {
    $help = [
        'gsc_slug' => 'URL segment only, e.g. brooklyn or truck-drivers (no slashes).',
        'gsc_seo_title' => 'Full browser / Google title (include brand if needed).',
        'gsc_seo_description' => 'Meta description ~150–160 characters.',
        'gsc_seo_keywords' => 'Comma-separated keywords.',
        'gsc_intro_paragraphs' => 'One paragraph per line.',
        'gsc_intro_bullets' => 'One bullet per line.',
        'gsc_sidebar_highlights' => 'One highlight per line.',
        'gsc_market_paragraphs' => 'One paragraph per line (optional section).',
        'gsc_programs_json' => 'JSON array: [{"title":"…","description":"…"}]',
        'gsc_faqs_json' => 'JSON array: [{"question":"…","answer":"…"}]',
    ];
    return isset($help[$key]) ? $help[$key] : '';
}

add_action('add_meta_boxes', function () {
    foreach (['gsc_location', 'gsc_specialty'] as $pt) {
        add_meta_box(
            'gsc_landing_fields',
            'Page content (GSC → Next.js)',
            'gsc_render_landing_metabox',
            $pt,
            'normal',
            'high'
        );
    }
});

function gsc_render_landing_metabox($post) {
    wp_nonce_field('gsc_save_landing', 'gsc_landing_nonce');
    $keys = gsc_landing_meta_keys();
    echo '<p style="color:#555;max-width:720px">These fields power SEO landing pages on the Next.js site. After you click Update, WordPress can call the Next.js revalidate API (set URL + secret under Settings → GSC Site Settings).</p>';
    echo '<table class="form-table" role="presentation">';
    foreach ($keys as $key => $default) {
        $val = get_post_meta($post->ID, $key, true);
        if ($val === '' && $default !== '') {
            $val = $default;
        }
        $label = str_replace(['gsc_', '_'], ['', ' '], $key);
        $is_area = in_array($key, [
            'gsc_seo_description',
            'gsc_hero_subheading',
            'gsc_intro_paragraphs',
            'gsc_intro_bullets',
            'gsc_sidebar_body',
            'gsc_sidebar_highlights',
            'gsc_market_paragraphs',
            'gsc_programs_json',
            'gsc_faqs_json',
            'gsc_cta_body',
        ], true);
        $help = gsc_landing_field_help($key);
        echo '<tr><th scope="row"><label for="' . esc_attr($key) . '">' . esc_html(ucwords($label)) . '</label></th><td>';
        if ($is_area) {
            $rows = (strpos($key, 'json') !== false) ? 8 : 4;
            echo '<textarea class="large-text code" rows="' . (int) $rows . '" style="width:100%" id="' . esc_attr($key) . '" name="' . esc_attr($key) . '">' . esc_textarea($val) . '</textarea>';
        } else {
            echo '<input type="text" class="large-text" style="width:100%" id="' . esc_attr($key) . '" name="' . esc_attr($key) . '" value="' . esc_attr($val) . '" />';
        }
        if ($help) {
            echo '<p class="description">' . esc_html($help) . '</p>';
        }
        echo '</td></tr>';
    }
    echo '</table>';
}

add_action('save_post_gsc_location', 'gsc_save_landing_meta', 10, 2);
add_action('save_post_gsc_specialty', 'gsc_save_landing_meta', 10, 2);

function gsc_save_landing_meta($post_id, $post = null) {
    if (!isset($_POST['gsc_landing_nonce']) || !wp_verify_nonce($_POST['gsc_landing_nonce'], 'gsc_save_landing')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    foreach (array_keys(gsc_landing_meta_keys()) as $key) {
        if (isset($_POST[$key])) {
            update_post_meta($post_id, $key, wp_unslash($_POST[$key]));
        }
    }

    $kind = ($post && $post->post_type === 'gsc_specialty') ? 'specialty' : 'location';
    $slug = get_post_meta($post_id, 'gsc_slug', true);
    if (!$slug && $post) {
        $slug = $post->post_name;
    }
    $paths = ['/locations', '/specialties', '/sitemap.xml'];
    if ($slug) {
        $paths[] = ($kind === 'specialty' ? '/specialties/' : '/locations/') . sanitize_title($slug);
    }
    gsc_trigger_revalidate($paths);
}

/* -------------------------------------------------------------------------- */
/* Settings                                                                   */
/* -------------------------------------------------------------------------- */

function gsc_settings_fields() {
    return [
        // Company
        'companyName' => 'Green Street Capital',
        'legalName' => 'Green Street Capital, LLC',
        'nmls' => '2066586',
        'brandTagline' => 'Your trusted partner for home purchases, refinancing, and mortgage solutions across NY, NJ, FL, and PA.',
        // Address
        'address_line1' => '2709 Coney Island Ave, 3rd Floor',
        'address_city' => 'Brooklyn',
        'address_state' => 'NY',
        'address_zip' => '11235',
        // Phones
        'phone_local' => '718-615-4545',
        'phone_local_tel' => '+17186154545',
        'phone_toll_free' => '855-615-4545',
        'phone_toll_free_tel' => '+18556154545',
        'phone_fax' => '718-819-1127',
        'email' => 'Info@GSCMortgage.com',
        'website' => 'https://www.greenstreetcapitalgroup.com',
        // Maps / reviews
        'googleReviewsUrl' => '',
        'googleMapsEmbedQuery' => 'Green+Street+Capital+2709+Coney+Island+Ave+3rd+Floor+Brooklyn+NY+11235',
        // Social
        'social_instagram' => 'https://www.instagram.com/gsc.mortgage',
        'social_facebook' => 'https://www.facebook.com/greenstreetcapital',
        'social_twitter' => 'https://twitter.com/greenstreetcap',
        'social_linkedin' => 'https://www.linkedin.com/company/green-street-capital',
        'social_youtube' => 'https://www.youtube.com/@GSC.MORTGAGE',
        'social_tiktok' => 'https://www.tiktok.com/@gsc.mortgage',
        // Content JSON (optional overrides — leave empty to use Next.js local JSON)
        'homepage_json' => '',
        'reviews_json' => '[]',
        'videos_json' => '',
        // Next.js revalidate
        'next_revalidate_url' => '',
        'next_revalidate_secret' => '',
        'cors_origin' => '*',
    ];
}

add_action('admin_menu', function () {
    add_options_page(
        'GSC Site Settings',
        'GSC Site Settings',
        'manage_options',
        'gsc-site-settings',
        'gsc_render_settings_page'
    );
});

function gsc_render_settings_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    if (isset($_POST['gsc_settings_nonce']) && wp_verify_nonce($_POST['gsc_settings_nonce'], 'gsc_save_settings')) {
        foreach (array_keys(gsc_settings_fields()) as $key) {
            if (isset($_POST[$key])) {
                update_option('gsc_' . $key, wp_unslash($_POST[$key]));
            }
        }
        gsc_trigger_revalidate(['/', '/contact', '/about', '/sitemap.xml']);
        echo '<div class="updated notice"><p>Settings saved. Next.js revalidate was requested (if URL + secret are set).</p></div>';
    }

    if (isset($_POST['gsc_test_revalidate']) && wp_verify_nonce($_POST['gsc_settings_nonce_test'] ?? '', 'gsc_test_revalidate')) {
        $result = gsc_trigger_revalidate(['/'], true);
        if (is_wp_error($result)) {
            echo '<div class="error notice"><p>Revalidate failed: ' . esc_html($result->get_error_message()) . '</p></div>';
        } else {
            echo '<div class="updated notice"><p>Revalidate request sent. HTTP ' . esc_html((string) $result) . '</p></div>';
        }
    }

    echo '<div class="wrap"><h1>GSC Site Settings</h1>';
    echo '<p>Public REST base: <code>' . esc_html(rest_url('gsc/v1/')) . '</code></p>';
    echo '<p>Health check: <code>' . esc_html(rest_url('gsc/v1/health')) . '</code></p>';

    echo '<form method="post">';
    wp_nonce_field('gsc_save_settings', 'gsc_settings_nonce');
    echo '<table class="form-table" role="presentation">';

    $sections = [
        'Company' => ['companyName', 'legalName', 'nmls', 'brandTagline', 'email', 'website'],
        'Address' => ['address_line1', 'address_city', 'address_state', 'address_zip'],
        'Phones' => ['phone_local', 'phone_local_tel', 'phone_toll_free', 'phone_toll_free_tel', 'phone_fax'],
        'Maps & reviews' => ['googleReviewsUrl', 'googleMapsEmbedQuery'],
        'Social' => ['social_instagram', 'social_facebook', 'social_twitter', 'social_linkedin', 'social_youtube', 'social_tiktok'],
        'Optional JSON overrides' => ['homepage_json', 'reviews_json', 'videos_json'],
        'Next.js revalidate' => ['next_revalidate_url', 'next_revalidate_secret', 'cors_origin'],
    ];

    $fields = gsc_settings_fields();
    foreach ($sections as $heading => $keys) {
        echo '<tr><th colspan="2"><h2 style="margin:1.5em 0 0.5em">' . esc_html($heading) . '</h2></th></tr>';
        foreach ($keys as $key) {
            if (!array_key_exists($key, $fields)) {
                continue;
            }
            $default = $fields[$key];
            $val = get_option('gsc_' . $key, $default);
            $is_area = str_ends_with($key, '_json') || $key === 'brandTagline' || $key === 'googleReviewsUrl';
            echo '<tr><th scope="row"><label for="gsc_' . esc_attr($key) . '">' . esc_html($key) . '</label></th><td>';
            if ($is_area) {
                echo '<textarea id="gsc_' . esc_attr($key) . '" name="' . esc_attr($key) . '" rows="6" class="large-text code" style="width:100%">' . esc_textarea($val) . '</textarea>';
            } else {
                $type = (strpos($key, 'secret') !== false) ? 'password' : 'text';
                echo '<input type="' . esc_attr($type) . '" class="regular-text" style="width:100%" id="gsc_' . esc_attr($key) . '" name="' . esc_attr($key) . '" value="' . esc_attr($val) . '" autocomplete="off" />';
            }
            if ($key === 'next_revalidate_url') {
                echo '<p class="description">Example: <code>https://www.greenstreetcapitalgroup.com/api/revalidate</code></p>';
            }
            if ($key === 'homepage_json' || $key === 'videos_json') {
                echo '<p class="description">Leave empty to keep using Next.js <code>content/*.json</code> files.</p>';
            }
            echo '</td></tr>';
        }
    }

    echo '</table>';
    submit_button('Save settings');
    echo '</form>';

    echo '<hr /><h2>Test revalidate</h2>';
    echo '<form method="post">';
    wp_nonce_field('gsc_test_revalidate', 'gsc_settings_nonce_test');
    echo '<input type="hidden" name="gsc_test_revalidate" value="1" />';
    submit_button('Send test revalidate to Next.js', 'secondary');
    echo '</form></div>';
}

/**
 * POST to Next.js /api/revalidate
 *
 * @param string[] $paths
 * @param bool $return_status
 * @return true|int|WP_Error
 */
function gsc_trigger_revalidate(array $paths = [], $return_status = false) {
    $url = trim((string) get_option('gsc_next_revalidate_url', ''));
    $secret = (string) get_option('gsc_next_revalidate_secret', '');

    if ($url === '' || $secret === '') {
        if ($return_status) {
            return new WP_Error('gsc_revalidate_config', 'Set next_revalidate_url and next_revalidate_secret first.');
        }
        return true;
    }

    $response = wp_remote_post($url, [
        'timeout' => 15,
        'headers' => [
            'Content-Type' => 'application/json',
            'x-revalidate-secret' => $secret,
        ],
        'body' => wp_json_encode([
            'paths' => array_values(array_unique($paths)),
            'tags' => ['wordpress-cms'],
        ]),
    ]);

    if (is_wp_error($response)) {
        if ($return_status) {
            return $response;
        }
        error_log('[gsc-cms] revalidate error: ' . $response->get_error_message());
        return $response;
    }

    $code = (int) wp_remote_retrieve_response_code($response);
    if ($return_status) {
        return $code;
    }
    if ($code < 200 || $code >= 300) {
        error_log('[gsc-cms] revalidate HTTP ' . $code . ' body: ' . wp_remote_retrieve_body($response));
    }
    return true;
}

/* -------------------------------------------------------------------------- */
/* Map post → LandingPageContent                                              */
/* -------------------------------------------------------------------------- */

function gsc_map_landing_post($post, $kind) {
    $slug = get_post_meta($post->ID, 'gsc_slug', true);
    if (!$slug) {
        $slug = $post->post_name;
    }
    $keywords_raw = get_post_meta($post->ID, 'gsc_seo_keywords', true);
    $keywords = array_values(array_filter(array_map('trim', explode(',', (string) $keywords_raw))));

    $paragraphs = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', (string) get_post_meta($post->ID, 'gsc_intro_paragraphs', true)))));
    $bullets = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', (string) get_post_meta($post->ID, 'gsc_intro_bullets', true)))));
    $highlights = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', (string) get_post_meta($post->ID, 'gsc_sidebar_highlights', true)))));
    $market_paras = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', (string) get_post_meta($post->ID, 'gsc_market_paragraphs', true)))));

    $programs = json_decode((string) get_post_meta($post->ID, 'gsc_programs_json', true), true);
    if (!is_array($programs)) {
        $programs = [];
    }
    $faqs = json_decode((string) get_post_meta($post->ID, 'gsc_faqs_json', true), true);
    if (!is_array($faqs)) {
        $faqs = [];
    }

    $payload = [
        'slug' => $slug,
        'kind' => $kind,
        'seo' => [
            'title' => get_post_meta($post->ID, 'gsc_seo_title', true) ?: $post->post_title,
            'description' => get_post_meta($post->ID, 'gsc_seo_description', true) ?: '',
            'keywords' => $keywords,
        ],
        'hero' => [
            'heading' => get_post_meta($post->ID, 'gsc_hero_heading', true) ?: $post->post_title,
            'subheading' => get_post_meta($post->ID, 'gsc_hero_subheading', true) ?: '',
        ],
        'intro' => [
            'heading' => get_post_meta($post->ID, 'gsc_intro_heading', true) ?: '',
            'paragraphs' => $paragraphs,
            'bullets' => $bullets,
        ],
        'sidebar' => [
            'heading' => get_post_meta($post->ID, 'gsc_sidebar_heading', true) ?: '',
            'body' => get_post_meta($post->ID, 'gsc_sidebar_body', true) ?: '',
            'highlights' => $highlights,
        ],
        'programsHeading' => get_post_meta($post->ID, 'gsc_programs_heading', true) ?: 'Programs',
        'programs' => array_map(function ($p) {
            return [
                'title' => isset($p['title']) ? $p['title'] : '',
                'description' => isset($p['description']) ? $p['description'] : '',
            ];
        }, $programs),
        'faqs' => array_map(function ($f) {
            return [
                'question' => isset($f['question']) ? $f['question'] : '',
                'answer' => isset($f['answer']) ? $f['answer'] : '',
            ];
        }, $faqs),
        'cta' => [
            'heading' => get_post_meta($post->ID, 'gsc_cta_heading', true) ?: '',
            'body' => get_post_meta($post->ID, 'gsc_cta_body', true) ?: '',
        ],
    ];

    $market_heading = get_post_meta($post->ID, 'gsc_market_heading', true);
    if ($market_heading || $market_paras) {
        $payload['market'] = [
            'heading' => $market_heading ?: 'Local market',
            'paragraphs' => $market_paras,
        ];
    }

    return $payload;
}

function gsc_site_payload() {
    $line1 = get_option('gsc_address_line1', '2709 Coney Island Ave, 3rd Floor');
    $city = get_option('gsc_address_city', 'Brooklyn');
    $state = get_option('gsc_address_state', 'NY');
    $zip = get_option('gsc_address_zip', '11235');
    $nmls = get_option('gsc_nmls', '2066586');

    return [
        'companyName' => get_option('gsc_companyName', 'Green Street Capital'),
        'legalName' => get_option('gsc_legalName', 'Green Street Capital, LLC'),
        'nmls' => $nmls,
        'brandTagline' => get_option('gsc_brandTagline', ''),
        'address' => [
            'line1' => $line1,
            'line2' => '',
            'city' => $city,
            'state' => $state,
            'zip' => $zip,
            'full' => trim("$line1, $city, $state $zip"),
        ],
        'phones' => [
            'local' => get_option('gsc_phone_local', '718-615-4545'),
            'localTel' => get_option('gsc_phone_local_tel', '+17186154545'),
            'tollFree' => get_option('gsc_phone_toll_free', '855-615-4545'),
            'tollFreeTel' => get_option('gsc_phone_toll_free_tel', '+18556154545'),
            'fax' => get_option('gsc_phone_fax', '718-819-1127'),
        ],
        'email' => get_option('gsc_email', 'Info@GSCMortgage.com'),
        'website' => get_option('gsc_website', 'https://www.greenstreetcapitalgroup.com'),
        'googleReviewsUrl' => get_option('gsc_googleReviewsUrl', ''),
        'googleMapsEmbedQuery' => get_option(
            'gsc_googleMapsEmbedQuery',
            'Green+Street+Capital+2709+Coney+Island+Ave+3rd+Floor+Brooklyn+NY+11235'
        ),
        'social' => [
            'instagram' => get_option('gsc_social_instagram', 'https://www.instagram.com/gsc.mortgage'),
            'facebook' => get_option('gsc_social_facebook', 'https://www.facebook.com/greenstreetcapital'),
            'twitter' => get_option('gsc_social_twitter', 'https://twitter.com/greenstreetcap'),
            'linkedin' => get_option('gsc_social_linkedin', 'https://www.linkedin.com/company/green-street-capital'),
            'youtube' => get_option('gsc_social_youtube', 'https://www.youtube.com/@GSC.MORTGAGE'),
            'tiktok' => get_option('gsc_social_tiktok', 'https://www.tiktok.com/@gsc.mortgage'),
        ],
        'statesServed' => ['NY', 'NJ', 'FL', 'PA'],
        'licensedIn' => [
            'NYS Dept of Financial Services',
            'NJ Dept of Banking & Insurance',
            'FL Office of Financial Regulation',
            'PA Dept of Banking & Securities',
        ],
        'nmlsConsumerAccessUrl' => 'https://www.nmlsconsumeraccess.org/',
        'handbookPdf' => '/buyers-handbook.pdf',
        'applyPath' => '/apply',
        'teamPath' => '/team',
        'footerDisclaimer' => [
            'Registered Mortgage Broker | Loans arranged with third party lenders | NMLS #' . $nmls,
            'Mortgage Broker will not make any mortgage loan commitments or fund any mortgage loans.',
        ],
    ];
}

/* -------------------------------------------------------------------------- */
/* REST API                                                                   */
/* -------------------------------------------------------------------------- */

add_action('rest_api_init', function () {
    register_rest_route('gsc/v1', '/health', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            $loc = wp_count_posts('gsc_location');
            $sp = wp_count_posts('gsc_specialty');
            return [
                'ok' => true,
                'plugin' => 'gsc-cms',
                'version' => GSC_CMS_VERSION,
                'locationsPublished' => isset($loc->publish) ? (int) $loc->publish : 0,
                'specialtiesPublished' => isset($sp->publish) ? (int) $sp->publish : 0,
                'revalidateConfigured' => (bool) (
                    get_option('gsc_next_revalidate_url', '') && get_option('gsc_next_revalidate_secret', '')
                ),
            ];
        },
    ]);

    register_rest_route('gsc/v1', '/site', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            return gsc_site_payload();
        },
    ]);

    register_rest_route('gsc/v1', '/homepage', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            $raw = get_option('gsc_homepage_json', '');
            if ($raw) {
                $decoded = json_decode($raw, true);
                if (is_array($decoded)) {
                    return $decoded;
                }
            }
            return new WP_Error(
                'gsc_no_homepage',
                'Set homepage_json in GSC Site Settings or use local Next.js JSON.',
                ['status' => 404]
            );
        },
    ]);

    register_rest_route('gsc/v1', '/reviews', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            $raw = get_option('gsc_reviews_json', '[]');
            $items = json_decode($raw, true);
            if (!is_array($items)) {
                $items = [];
            }
            return ['items' => $items];
        },
    ]);

    register_rest_route('gsc/v1', '/videos', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            $raw = get_option('gsc_videos_json', '');
            if ($raw) {
                $decoded = json_decode($raw, true);
                if (is_array($decoded)) {
                    return $decoded;
                }
            }
            return new WP_Error(
                'gsc_no_videos',
                'Set videos_json in settings or use local JSON.',
                ['status' => 404]
            );
        },
    ]);

    $list_callback = function ($request, $post_type, $kind) {
        $full = $request->get_param('full');
        $posts = get_posts([
            'post_type' => $post_type,
            'post_status' => 'publish',
            'numberposts' => -1,
            'orderby' => 'title',
            'order' => 'ASC',
        ]);
        if ($full) {
            $items = array_map(function ($p) use ($kind) {
                return gsc_map_landing_post($p, $kind);
            }, $posts);
            return ['items' => $items];
        }
        $slugs = [];
        foreach ($posts as $p) {
            $slug = get_post_meta($p->ID, 'gsc_slug', true);
            $slugs[] = $slug ?: $p->post_name;
        }
        return ['slugs' => $slugs];
    };

    register_rest_route('gsc/v1', '/locations', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function ($req) use ($list_callback) {
            return $list_callback($req, 'gsc_location', 'location');
        },
    ]);

    register_rest_route('gsc/v1', '/specialties', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function ($req) use ($list_callback) {
            return $list_callback($req, 'gsc_specialty', 'specialty');
        },
    ]);

    register_rest_route('gsc/v1', '/locations/(?P<slug>[a-z0-9\-]+)', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function ($request) {
            $slug = $request['slug'];
            $posts = get_posts([
                'post_type' => 'gsc_location',
                'post_status' => 'publish',
                'numberposts' => 1,
                'meta_key' => 'gsc_slug',
                'meta_value' => $slug,
            ]);
            if (!$posts) {
                $posts = get_posts([
                    'post_type' => 'gsc_location',
                    'name' => $slug,
                    'post_status' => 'publish',
                    'numberposts' => 1,
                ]);
            }
            if (!$posts) {
                return new WP_Error('not_found', 'Location not found', ['status' => 404]);
            }
            return gsc_map_landing_post($posts[0], 'location');
        },
    ]);

    register_rest_route('gsc/v1', '/specialties/(?P<slug>[a-z0-9\-]+)', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function ($request) {
            $slug = $request['slug'];
            $posts = get_posts([
                'post_type' => 'gsc_specialty',
                'post_status' => 'publish',
                'numberposts' => 1,
                'meta_key' => 'gsc_slug',
                'meta_value' => $slug,
            ]);
            if (!$posts) {
                $posts = get_posts([
                    'post_type' => 'gsc_specialty',
                    'name' => $slug,
                    'post_status' => 'publish',
                    'numberposts' => 1,
                ]);
            }
            if (!$posts) {
                return new WP_Error('not_found', 'Specialty not found', ['status' => 404]);
            }
            return gsc_map_landing_post($posts[0], 'specialty');
        },
    ]);
});

/* CORS for headless front end */
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $origin = get_option('gsc_cors_origin', '*');
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, x-revalidate-secret');
        return $value;
    });
}, 15);
