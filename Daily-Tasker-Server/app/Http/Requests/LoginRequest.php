<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'email|exists:users|max:255',
            'password' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'email.email' => 'The email address must be a valid email format.',
            'email.exists' => 'The provided email or password is not correct.',
            'email.max' => 'The email address must not exceed 255 characters.',
            'password.required' => 'The password field is required.',
            'password.string' => 'The password must be a string.',
        ];
    }

}
