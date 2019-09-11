import { ValidationErrors, FormGroup } from '@angular/forms';

export class FormValidators {

  /**
   * Form validators
   *
   * @example
   * this.form = this.formBuilder.group(
   *   {
   *     password: [null, Validators.required],
   *     confirmPassword: [null, [Validators.required]]
   *   },
   *   {
   *     validators: [FormValidators.mustMatch('password', 'confirmPassword')]
   *   }
   * );
   *
   * @param(string) controlName
   * @param(string) matchingControlName
   * @returns(ValidationErrors)
   */
  static mustMatch(controlName: string, matchingControlName: string): ValidationErrors | null {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
