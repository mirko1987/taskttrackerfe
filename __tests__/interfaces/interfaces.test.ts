describe('Interface Types', () => {
  describe('Task interface', () => {
    it('should define the correct structure', () => {
      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
      };

      expect(typeof mockTask.id).toBe('number');
      expect(typeof mockTask.title).toBe('string');
      expect(typeof mockTask.description).toBe('string');
      expect(typeof mockTask.completed).toBe('boolean');
    });

    it('should allow completed tasks', () => {
      const completedTask = {
        id: 2,
        title: 'Completed Task',
        description: 'Completed Description',
        completed: true,
      };

      expect(completedTask.completed).toBe(true);
    });
  });

  describe('CreateTaskRequest interface', () => {
    it('should define the correct structure', () => {
      const createRequest = {
        title: 'New Task',
        description: 'New Description',
      };

      expect(typeof createRequest.title).toBe('string');
      expect(typeof createRequest.description).toBe('string');
      expect(createRequest).not.toHaveProperty('id');
      expect(createRequest).not.toHaveProperty('completed');
    });
  });

  describe('HttpError interface', () => {
    it('should define the correct structure', () => {
      const httpError = {
        message: 'Error occurred',
        status: 404,
        details: 'Not found',
      };

      expect(typeof httpError.message).toBe('string');
      expect(typeof httpError.status).toBe('number');
      expect(typeof httpError.details).toBe('string');
    });
  });
}); 