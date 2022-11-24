interface ValidateInput {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const validation = (inputValue: ValidateInput) => {
  let isValid = true;
  const { value, required, max, maxLength, min, minLength } = inputValue;

  if (required) {
    isValid = isValid && value.toString().trim().length > 0;
  }
  if (minLength != null && typeof value === 'string') {
    isValid = isValid && minLength <= value.length;
  }
  if (maxLength != null && typeof value === 'string') {
    isValid = isValid && maxLength >= value.length;
  }
  if (min != null && typeof value === 'number') {
    isValid = isValid && min <= value;
  }
  if (max != null && typeof value === 'number') {
    isValid = isValid && max >= value;
  }
  return isValid;
};

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputValue: HTMLInputElement;
  descriptionInputValue: HTMLInputElement;
  peopleInputValue: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.titleInputValue = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputValue = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputValue = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;
    this.element.id = 'user-input';
    this.connect();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputValue.value;
    const description = this.descriptionInputValue.value;
    const people = +this.peopleInputValue.value;

    const titleValidation: ValidateInput = {
      value: title,
      required: true,
      minLength: 1,
    };
    const descriptionValidation: ValidateInput = {
      value: description,
      required: true,
      minLength: 5,
    };
    const peopleValidation: ValidateInput = {
      value: people,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      validation(titleValidation) &&
      validation(descriptionValidation) &&
      validation(peopleValidation)
    ) {
      return [title, description, people];
    } else {
      alert('Invalid input, please try again...');
      return;
    }
  }

  private formSumitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    if (userInput) {
      const [title, description, people] = userInput;
      console.log(title, description, people);
    }
  }

  private connect() {
    this.element.addEventListener('submit', this.formSumitHandler.bind(this));
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
