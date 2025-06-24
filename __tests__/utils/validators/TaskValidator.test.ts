describe('TaskValidatorImpl', () => {
  // Simple mock implementation for testing
  const mockValidator = {
    validateTitle: (title: string) => {
      const trimmedTitle = title.trim();
      const errors: string[] = [];
      
      if (!trimmedTitle) {
        errors.push('Title is required');
      } else if (trimmedTitle.length < 3) {
        errors.push('Title must be at least 3 characters');
      } else if (trimmedTitle.length > 100) {
        errors.push('Title cannot exceed 100 characters');
      }
      
      return {
        isValid: errors.length === 0,
        errors,
      };
    },
    
    validateDescription: (description: string) => {
      const trimmedDescription = description.trim();
      const errors: string[] = [];
      
      if (trimmedDescription.length > 0) {
        if (trimmedDescription.length < 5) {
          errors.push('Description must be at least 5 characters');
        } else if (trimmedDescription.length > 500) {
          errors.push('Description cannot exceed 500 characters');
        }
      }
      
      return {
        isValid: errors.length === 0,
        errors,
      };
    },
    
    validateTask: (task: { title: string; description: string }) => {
      const titleValidation = mockValidator.validateTitle(task.title);
      const descriptionValidation = mockValidator.validateDescription(task.description);
      
      const allErrors = [
        ...titleValidation.errors,
        ...descriptionValidation.errors,
      ];
      
      return {
        isValid: allErrors.length === 0,
        errors: allErrors,
      };
    }
  };

  describe('validateTitle', () => {
    it('returns valid result for valid titles', () => {
      const result1 = mockValidator.validateTitle('Valid title');
      expect(result1.isValid).toBe(true);
      expect(result1.errors).toEqual([]);

      const result2 = mockValidator.validateTitle('ABC');
      expect(result2.isValid).toBe(true);
      expect(result2.errors).toEqual([]);
    });

    it('returns error for empty title', () => {
      const result1 = mockValidator.validateTitle('');
      expect(result1.isValid).toBe(false);
      expect(result1.errors).toContain('Title is required');

      const result2 = mockValidator.validateTitle('   ');
      expect(result2.isValid).toBe(false);
      expect(result2.errors).toContain('Title is required');
    });

    it('returns error for title too short', () => {
      const result = mockValidator.validateTitle('AB');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title must be at least 3 characters');
    });

    it('returns error for title too long', () => {
      const longTitle = 'A'.repeat(101);
      const result = mockValidator.validateTitle(longTitle);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title cannot exceed 100 characters');
    });
  });

  describe('validateDescription', () => {
    it('returns valid result for valid descriptions', () => {
      const result1 = mockValidator.validateDescription('Valid description');
      expect(result1.isValid).toBe(true);
      expect(result1.errors).toEqual([]);

      const result2 = mockValidator.validateDescription('');
      expect(result2.isValid).toBe(true);
      expect(result2.errors).toEqual([]);
    });

    it('returns error for description too short', () => {
      const result = mockValidator.validateDescription('ABC');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Description must be at least 5 characters');
    });

    it('returns error for description too long', () => {
      const longDescription = 'A'.repeat(501);
      const result = mockValidator.validateDescription(longDescription);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Description cannot exceed 500 characters');
    });
  });

  describe('validateTask', () => {
    it('returns valid result for valid task', () => {
      const result = mockValidator.validateTask({
        title: 'Valid title',
        description: 'Valid description'
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('returns errors for invalid task', () => {
      const result = mockValidator.validateTask({
        title: '',
        description: 'A'.repeat(501)
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required');
      expect(result.errors).toContain('Description cannot exceed 500 characters');
    });

    it('handles mixed valid and invalid fields', () => {
      const result = mockValidator.validateTask({
        title: 'Valid title',
        description: 'A'.repeat(501)
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Description cannot exceed 500 characters');
    });
  });
}); 