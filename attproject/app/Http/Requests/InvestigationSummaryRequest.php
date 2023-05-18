<?php

namespace App\Http\Requests;

class InvestigationSummaryRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [

                'invest_snap_id'=>'required|max:255',
                'invest_level' =>'required|max:255',
                'invest_version'=>'required|max:255',
                "scan_year"=>'required|max:255',
                "scan_month"=>'required|max:255',
                "business_unit"=>'required|max:255',
                "scan_domain"=>'required|max:255',
                "title"=>'required|max:255',
                "start_count"=>'required|max:255',
                "approved_count"=>'required|max:255',
                "functional_count"=>'required|max:255',
                "microsite_count"=>'required|max:255',
                "remove_count"=>'nullable|max:255',
                "request_count"=>'required|max:255',
                "investigate_count"=>'required|max:255' ,
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
                'invest_snap_id.required'=>'an Id required',
                'invest_level.required' =>'required|max:255',
                'invest_version.required'=>'required|max:255',
                "scan_year.required"=>'required|max:255',
                "scan_month.required"=>'required|max:255',
                "business_unit.required"=>'required|max:255',
                "scan_domain.required"=>'required|max:255',
                "title.required"=>'required|max:255',
                "start_count.required"=>'required|max:255',
                "approved_count.required"=>'required|max:255',
                "functional_count.required"=>'required|max:255',
                "microsite_count.required"=>'required|max:255',
                "remove_count.required"=>'nullable|max:255',
                "request_count.required"=>'required|max:255',
                "investigate_count.required"=>'required|max:255' ,
        ];
    }
}
