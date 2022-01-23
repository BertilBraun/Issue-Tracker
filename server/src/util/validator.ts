interface AuthErrors {
  email?: string
  username?: string
  password?: string
}

interface ProjectErrors {
  name?: string
  description?: string
}

interface IssueErrors {
  title?: string
  description?: string
}

export const registerValidator = (
  username: string,
  email: string,
  password: string,
) => {
  const errors: AuthErrors = {}

  if (
    !username ||
    username.trim() === '' ||
    username.length > 20 ||
    username.length < 3
  ) {
    errors.username = 'Username must be in range of 3-20 characters length.'
  }

  if (!/^[a-zA-Z0-9-_]*$/.test(username)) {
    errors.username = 'Username must have alphanumeric characters only.'
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'Email must be valid.'
  }

  if (!password || password.length < 6) {
    errors.password = 'Password must be atleast 6 characters long.'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

export const loginValidator = (email: string, password: string) => {
  const errors: AuthErrors = {}

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'Email must be valid.'
  }

  if (!password) {
    errors.password = 'Password field must not be empty.'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

export const projectNameError = (name: string) => {
  if (!name || name.trim() === '' || name.length > 60) {
    return 'Project name length must not be more than 60.'
  }
}

export const createProjectValidator = (name: string, description: string) => {
  const errors: ProjectErrors = {}
  const nameError = projectNameError(name)

  if (nameError) {
    errors.name = nameError
  }

  if (!description || description.trim() === '' || description.length > 1000) {
    errors.description = 'Description length must not be more than 1000.'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

export const createIssueValidator = (title: string, description: string) => {
  const errors: IssueErrors = {}

  if (!title || title.trim() === '' || title.length > 60 || title.length < 3) {
    errors.title = 'Title must be in range of 3-60 characters length.'
  }

  if (!description || description.trim() === '') {
    errors.description = 'Description field must not be empty.'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}
