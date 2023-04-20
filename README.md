# Smart Form

Smart Form component is a developer-friendly solution for integrating form controls into your React project.

By leveraging the power of the [react-hook-form](https://react-hook-form.com/) library, it provides a reliable and efficient way to handle form validation and error handling. With automatic registration of form fields, the Smart Form component simplifies the development process and enables you to create robust and seamless forms with ease.

## [Live Preview](https://smart-form-demo.netlify.app/)

## Examples

### Form With Uncontrolled Fields

```tsx
<Form onSubmit={handleSubmit}>
  <FormField label="Name" name="name">
    <input />
  </FormField>
  <FormField label="Email" name="email">
    <input />
  </FormField>
  <button type="submit">Submit</button>
</Form>
```

### Form With Controlled Fields

This example demonstrates how to use the FormField component with either component libraries or custom input components.

```tsx
<Form onSubmit={handleSubmit}>
  <FormField
    controlled
    label="username"
    name="username"
    options={{
      required: "Please input your username!",
    }}
  >
    {(props) => (
      <input
        value={props.field.value}
        onChange={(e) => props.field.onChange(e.target.value)}
      />
    )}
  </FormField>
  <button type="submit">Submit</button>
</Form>
```

## Folder Structure

    .
    ├── ...
    ├── src                     # Source files
    │   ├── components          # Reusable components
    │   ├── features            # Features and related components, utilities
    │   └── index.tsx           # Entry point of the application.
    └── ...

## Running the demo locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.
