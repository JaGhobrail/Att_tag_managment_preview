<?php

namespace App\Http\Requests\AdTech;

class PageUrlListRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            // 'as_of_date'=>'required|max:255',
            //             'ver'=>'required|max:255',
            //             'num_scans'=>'required|max:255',
            //             'business_unit'=>'required|max:255',
            //             'scan_domain'=>'required|max:255',
            //             'scan_year'=>'required|max:255',
            //             'scan_month'=>'required|max:255',
            //             'vendor_parent'=>'required|max:255',
            //             'vendor_name'=>'required|max:255',
            //             'tracker_name'=>'required|max:255',
            //             'tracker_domain'=>'required|max:255',
            //             'page_section'=>'required|max:255',
            //             'result'=>'required|max:255',
            //             'notes'=>'required|max:255',
            //             'tracker_category'=>'required|max:255',
            //             'tracker_url'=>'required|max:255',
            //             'tracker_query'=>'required|max:255',
            //             'page_url'=>'required|max:255',
            //             'scan_date'=>'required|max:255',
            //             'tot_tags'=>'required|max:255',
            //             'tot_scripts'=>'required|max:255',
            //             'tot_beacons'=>'required|max:255',
            //             'tot_others'=>'required|max:255',
            //             'tot_cookies'=>'required|max:255',
            //             'tot_pages'=>'required|max:255'
        ];
    }
   /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array
     * Custom validation message
     */
    public function messages(): array
    {
        return [
            'as_of_date.required'=>'required|max:255',
                        'ver.required'=>'required|max:255',
                        'num_scans.required'=>'required|max:255',
                        'business_unit.required'=>'required|max:255',
                        'scan_domain.required'=>'required|max:255',
                        'scan_year.required'=>'required|max:255',
                        'scan_month.required'=>'required|max:255',
                        'vendor_parent.required'=>'required|max:255',
                        'vendor_name.required'=>'required|max:255',
                        'tracker_name.required'=>'required|max:255',
                        'tracker_domain.required'=>'required|max:255',
                        'page_section.required'=>'required|max:255',
                        'result.required'=>'required|max:255',
                        'notes.required'=>'required|max:255',
                        'tracker_category.required'=>'required|max:255',
                        'tracker_url.required'=>'required|max:255',
                        'tracker_query.required'=>'required|max:255',
                        'page_url.required'=>'required|max:255',
                        'scan_date.required'=>'required|max:255',
                        'tot_tags.required'=>'required|max:255',
                        'tot_scripts.required'=>'required|max:255',
                        'tot_beacons.required'=>'required|max:255',
                        'tot_others.required'=>'required|max:255',
                        'tot_cookies.required'=>'required|max:255',
                        'tot_pages.required'=>'required|max:255'
        ];
    }
}
