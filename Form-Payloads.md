# Admin Panel Form Payloads

> All form submissions below send `multipart/form-data` (FormData).
> Field names are written **exactly** as they are appended in the code.

---

## 1. Add Developer

- **File:** `src/views/AdminPanel/AdminPages/BasicFunctionPages/Developer/CreateDeveloper.jsx`
- **Method:** `POST`
- **Endpoint:** `/admin/developers/store`
- **Content-Type:** `multipart/form-data`

### Basic Information

| Field | Type | Required |
|-------|------|----------|
| name | text | Yes |
| slug | text | Yes |
| meta_title | text | Yes |
| meta_description | text | Yes |
| canonical_url | text | Yes |
| focus_keyword | text | Yes |
| redirect_301 | text | No |
| redirect_302 | text | No |
| old_redirect_url | text | No |
| schema | text (valid JSON) | Yes |
| email | text (email) | Yes |
| phone_no | text | Yes |
| location | text | Yes |
| description | rich text | Yes |
| logo | file | Yes |

### Main Image

| Field | Type | Required |
|-------|------|----------|
| main_image[alt] | text | Yes |
| main_image[name] | text | Yes |
| main_image[file] | file | Yes |

### Section 1

| Field | Type |
|-------|------|
| s1_heading | text |
| s1_description | rich text |
| s1_text | text (Years of Experience) |

### Section 2

| Field | Type |
|-------|------|
| s2_heading | text |
| s2_description | rich text |
| s2_image[alt] | text |
| s2_image[name] | text |
| s2_image[file] | file |
| s2_images[0][alt] | text |
| s2_images[0][name] | text |
| s2_images[0][file] | file |

### Section 3

| Field | Type |
|-------|------|
| s3_heading | text |

### Section 4

| Field | Type |
|-------|------|
| s4_heading | text |
| s4_image[alt] | text |
| s4_image[name] | text |
| s4_image[file] | file |
| s4_items[0][name] | text |
| s4_items[0][text] | rich text |
| s4_items[0][alt] | text |
| s4_items[0][alt_name] | text |
| s4_items[0][file] | file |

### Section 5

| Field | Type |
|-------|------|
| s5_heading | text |
| s5_sub_heading | text |
| s5_items[0][name] | text |
| s5_items[0][text] | rich text |
| s5_items[0][alt] | text |
| s5_items[0][alt_name] | text |
| s5_items[0][file] | file |

### Section 6

| Field | Type |
|-------|------|
| s6_heading | text |
| s6_content | text |
| s6_email | text |
| s6_phone | text |

### Section 7

| Field | Type |
|-------|------|
| s7_heading | text |
| s7_description | rich text |
| s7_image[alt] | text |
| s7_image[name] | text |
| s7_image[file] | file |

### Section 8

| Field | Type |
|-------|------|
| s8_heading | text |
| s8_description | rich text |
| s8_items[0][name] | text |
| s8_items[0][text] | rich text |
| s8_items[0][alt] | text |
| s8_items[0][alt_name] | text |
| s8_items[0][file] | file |

### Section 9 (FAQs)

| Field | Type |
|-------|------|
| s9_faqs[0][question] | text |
| s9_faqs[0][ans] | rich text |

### Footer Section

| Field | Type |
|-------|------|
| footer_section_title | text |
| footer_section_description | rich text |
| footer_section_image_alt | text |
| footer_section_image_text | text |
| footer_section_btn_1_text | text |
| footer_section_btn_1_link | text |
| footer_section_btn_2_text | text |
| footer_section_btn_2_link | text |
| footer_section_image_file | file |

---

## 2. Property Types

- **File:** `src/views/AdminPanel/AdminPages/BasicFunctionPages/AddCategory.jsx`
- **Method:** `POST`
- **Endpoint (Create):** `/admin/property-types/store`
- **Endpoint (Update):** `/admin/property-types/{id}/update`
- **Content-Type:** `multipart/form-data`

| Field | Type | Required |
|-------|------|----------|
| name | text | Yes |
| slug | text | Yes |
| image | file | No |
| image_alt | text | No |
| image_text | text | No |

---

## 3. Add Property

- **File:** `src/views/AdminPanel/AdminPages/BasicFunctionPages/Property/AddProperty.jsx`
- **Method:** `POST`
- **Endpoint:** `/admin/property/store`
- **Content-Type:** `multipart/form-data`

### Basic Fields

| Field | Type |
|-------|------|
| name | text |
| slug | text |
| short_description | text |
| meta_title | text |
| focus_keyword | text |
| redirect_301 | text |
| redirect_302 | text |
| old_redirect_url | text |
| schema | text |
| meta_description | text |
| canonical_url | text |
| developer_id | text |
| property_types_id | text |
| property_locations_name | text |
| square_feet | text |
| price | text |
| no_of_bedrooms | text |
| register_btn_link | text |
| image | file |
| broucher_file | file |
| image_alt | text |
| image_text | text |
| listing_type | text |
| handover | text |
| payment_plan | text |
| frond | text |
| villa_type | text |
| property_feature | text |

### Section 1

| Field | Type |
|-------|------|
| section_1_title | text |
| section_1_heading | text |
| section_1_image | file |
| section_1_image_alt | text |
| section_1_image_text | text |
| section_1_options[0][heading] | text |
| section_1_options[0][description] | rich text |
| section_1_options[0][image] | file |
| section_1_options[0][image_alt] | text |
| section_1_options[0][image_text] | text |

### Section 2

| Field | Type |
|-------|------|
| section_2_heading | text |
| section_2_description | rich text |
| section_2_image | file |
| section_2_image_alt | text |
| section_2_image_text | text |

### Footer Section

| Field | Type |
|-------|------|
| footer_section_title | text |
| footer_section_description | rich text |
| footer_section_image_alt | text |
| footer_section_image_text | text |
| footer_section_btn_1_text | text |
| footer_section_btn_1_link | text |
| footer_section_btn_2_text | text |
| footer_section_btn_2_link | text |
| footer_section_image_file | file |

### Section 3

| Field | Type |
|-------|------|
| section_3_title | text |
| section_3_heading | text |
| section_3_options[0][heading] | text |
| section_3_options[0][description] | rich text |
| section_3_options[0][image] | file |
| section_3_options[0][image_alt] | text |
| section_3_options[0][image_text] | text |

### Section 4

| Field | Type |
|-------|------|
| section_4_heading | text |
| section_4_description | rich text |
| section_4_interior_images[0][image] | file |
| section_4_interior_images[0][image_alt] | text |
| section_4_interior_images[0][image_text] | text |
| section_4_exterior_images[0][image] | file |
| section_4_exterior_images[0][image_alt] | text |
| section_4_exterior_images[0][image_text] | text |

### Section 5

| Field | Type |
|-------|------|
| section_5_heading | text |
| section_5_description | rich text |
| section_5_image | file |
| section_5_image_alt | text |
| section_5_image_text | text |

### Section 6

| Field | Type |
|-------|------|
| section_6_heading | text |
| section_6_options[0][text] | text |
| section_6_options[0][image] | file |
| section_6_options[0][image_alt] | text |
| section_6_options[0][image_text] | text |

### Section 7

| Field | Type |
|-------|------|
| section_7_heading | text |
| section_7_description | rich text |
| section_7_image | file |
| section_7_image_alt | text |
| section_7_image_text | text |
| section_7_options[0][text] | text |
| section_7_options[0][percent] | text |
| section_7_options[0][image] | file |
| section_7_options[0][image_alt] | text |
| section_7_options[0][image_text] | text |

### Section 8 (Floors)

| Field | Type |
|-------|------|
| section_8_heading | text |
| floors[0][floor_number] | text |
| floors[0][square_feet] | text |
| floors[0][floor_plan_image_alt] | text |
| floors[0][floor_plan_image_text] | text |
| floors[0][floor_plan_image] | file |
| floors[0][floor_plan_catalogue] | file |

### Section 9

| Field | Type |
|-------|------|
| section_9_heading | text |
| section_9_description | rich text |
| section_9_image | file |
| section_9_image_alt | text |
| section_9_image_text | text |

### Section 10

| Field | Type |
|-------|------|
| section_10_heading | text |
| section_10_description | rich text |

### Section 11 (FAQs)

| Field | Type |
|-------|------|
| section_11_faqs[0][question] | text |
| section_11_faqs[0][ans] | rich text |

---

## 4. Add Property Type Page

- **File:** `src/views/AdminPanel/AdminPages/BasicFunctionPages/Pages Wise Data/PropertyTypePages/PropertyTypePageForm.jsx`
- **Method:** `POST`
- **Endpoint:** `admin/property-type-page/save`
- **Content-Type:** `multipart/form-data`

### SEO Fields

| Field | Type |
|-------|------|
| slug | text |
| meta_title | text |
| meta_description | text |
| canonical_url | text |
| focus_keyword | text |
| schema | text |
| redirect_301 | text |
| redirect_302 | text |
| old_redirect_url | text |

### Selection

| Field | Type |
|-------|------|
| property_type_id | text |
| property_locations_name | text |

### Banner Section

| Field | Type |
|-------|------|
| Banner_image | file |
| Banner_image_alt | text |
| Banner_image_text | text |
| Banner_heading | text |

### Section 1

| Field | Type |
|-------|------|
| section_1_title | text |

### Section 2

| Field | Type |
|-------|------|
| location_section_heading | text |
| location_section_description | rich text |
| location_section_image_file | file |
| location_section_image_alt | text |
| location_section_image_text | text |

### Section 3

| Field | Type |
|-------|------|
| location_section2_heading | text |
| location_section2_description | rich text |
| location_section2_image_file | file |
| location_section2_image_alt | text |
| location_section2_image_text | text |

### Section 4

| Field | Type |
|-------|------|
| section_2_heading | text |
| section_2_description | rich text |
| section_2_email | text |
| section_2_phone | text |

### Section 5

| Field | Type |
|-------|------|
| section_3_title | text |

### Footer Section

| Field | Type |
|-------|------|
| footer_section_title | text |
| footer_section_description | rich text |
| footer_section_image_file | file |
| footer_section_image_alt | text |
| footer_section_image_text | text |
| footer_section_btn_1_text | text |
| footer_section_btn_1_link | text |
| footer_section_btn_2_text | text |
| footer_section_btn_2_link | text |

---

## 5. Categories (Blog)

- **File:** `src/views/AdminPanel/AdminPages/BasicFunctionPages/Blog/BlogCat.jsx`
- **Method:** `POST`
- **Endpoint (Create):** `/admin/blog-category/store`
- **Endpoint (Update):** `/admin/blog-category/{id}/update`
- **Content-Type:** `multipart/form-data`

| Field | Type | Required |
|-------|------|----------|
| name | text | Yes |
| slug | text | Yes |
| Meta_title | text | Yes |
| Meta_description | text | Yes |
| description | text | Yes |

> Note: field names `Meta_title` and `Meta_description` use a capital `M` exactly as defined in the code.

---

## 6. Add Blog

- **File:** `src/views/AdminPanel/AdminPages/BasicFunctionPages/Blog/BlogCreation.jsx`
- **Method:** `POST`
- **Endpoint (Create):** `/admin/blogs/store`
- **Endpoint (Update):** `/admin/blogs/{id}/update`
- **Content-Type:** `multipart/form-data`

| Field | Type | Required |
|-------|------|----------|
| category_id | text | Yes |
| tags_id | text | Yes |
| title | text | Yes |
| image | file | Yes (create) |
| short_description | text | Yes |
| description_image | file | Yes (create) |
| description | rich text | Yes |
| date | text | No |
| heading | text | Yes |
| slug | text | Yes |
| meta_title | text | Yes |
| meta_description | text | Yes |
| canonical_url | text | Yes |
| focus_keyword | text | Yes |
| redirect_301 | text | No |
| redirect_302 | text | No |
| old_redirect_url | text | No |
| schema | text | Yes |

---

## 7. Add Faqs

- **File:** `src/views/AdminPanel/AdminPages/BasicFunctionPages/Faqs/CreateFaqs.jsx`
- **Method:** `POST`
- **Endpoint (Create):** `/admin/faqs/store`
- **Endpoint (Update):** `/admin/faqs/{id}/update`
- **Content-Type:** `multipart/form-data`

| Field | Type | Required |
|-------|------|----------|
| page_id | text | Yes |
| category_id | text | Only when present |
| faqs[0][question] | text | Yes |
| faqs[0][answer] | rich text | Yes |

> Note: `faqs` uses `answer` (not `ans`), unlike Developer and Property FAQs.
