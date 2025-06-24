import { TaskValidator, ValidationResult, CreateTaskRequest } from '../../interfaces/interfaces';

export class TaskValidatorImpl implements TaskValidator {
  private readonly MIN_TITLE_LENGTH = 3;
  private readonly MAX_TITLE_LENGTH = 100;
  private readonly MIN_DESCRIPTION_LENGTH = 5;
  private readonly MAX_DESCRIPTION_LENGTH = 500;

  validateTitle(title: string): ValidationResult {
    const errors: string[] = [];
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      errors.push('Title is required');
    } else if (trimmedTitle.length < this.MIN_TITLE_LENGTH) {
      errors.push(`Title must be at least ${this.MIN_TITLE_LENGTH} characters`);
    } else if (trimmedTitle.length > this.MAX_TITLE_LENGTH) {
      errors.push(`Title cannot exceed ${this.MAX_TITLE_LENGTH} characters`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateDescription(description: string): ValidationResult {
    const errors: string[] = [];
    const trimmedDescription = description.trim();

    if (trimmedDescription.length > 0) {
      if (trimmedDescription.length < this.MIN_DESCRIPTION_LENGTH) {
        errors.push(`Description must be at least ${this.MIN_DESCRIPTION_LENGTH} characters`);
      } else if (trimmedDescription.length > this.MAX_DESCRIPTION_LENGTH) {
        errors.push(`Description cannot exceed ${this.MAX_DESCRIPTION_LENGTH} characters`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateTask(task: CreateTaskRequest): ValidationResult {
    const titleValidation = this.validateTitle(task.title);
    const descriptionValidation = this.validateDescription(task.description);

    const allErrors = [
      ...titleValidation.errors,
      ...descriptionValidation.errors,
    ];

    return {
      isValid: allErrors.length === 0,
      errors: allErrors,
    };
  }
}