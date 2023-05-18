<?php

namespace App\Http\Requests;

class TagRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name'       => 'required|max:255',
            'description' => 'nullable|max:5000',
            'rate'       => 'required|numeric',
            'rank'       => 'required|numeric',
            'accessibility'       => 'required|max:255',
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
            'name.required'       => 'Please give tag name',
            'name.max'       => 'Please give tag name maximum of 255 characters',
            'description.required' => 'Please give tag description',
            'rate.required'       => 'Please give tag rate',
            'rate.numeric'       => 'Please give a numeric tag rate',
            'rank.required'       => 'Please give tag rank',
            'rank.numeric'       => 'Please give a numeric tag rank',
            'accessibility.required'       => 'Please give tag accessibility',
        ];
    }
}
