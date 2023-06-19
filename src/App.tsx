import React, { useState } from "react";
import { useDecoratedValidation } from "react-decorate-form";
import FormControl from "./component/FormControl";
import UserForm from "./model/UserForm";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import "./App.css";
import { Add, Delete } from "@mui/icons-material";

function App() {
  function getElementType<T>(arr: T[]): T | undefined {
    if (arr.length === 0) {
      return undefined;
    }
    return arr[0];
  }

  // Usage example
  const myArray: string[] = ["foo", "bar"];
  const elementType = getElementType(myArray);

  const {
    value: formData,
    setValue: setFormData,
    errors,
    isValid,
  } = useDecoratedValidation(
    {
      age: 0,
      url: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
      hobbies: [],
      passwordsMatch: false,
    },
    UserForm
  );

  const onChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (objectData: UserForm) => {
    alert(JSON.stringify(objectData, null, 2));
  };

  const [hobbyEntry, setHobbyEntry] = useState("");

  function removeHobby(hobby: string) {
    setFormData((prev) => ({
      ...prev,
      hobbies: [...prev.hobbies].filter((h) => h !== hobby),
    }));
  }

  function saveHobby() {
    setFormData((prev) => ({
      ...prev,
      hobbies: [...prev.hobbies, hobbyEntry],
    }));
    setHobbyEntry("");
  }

  return (
    <Container>
      <Card>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            User form
          </Typography>
          <FormControl
            label="First name"
            value={formData.firstName}
            required={true}
            placeholder="John"
            onChange={(v) => onChange("firstName", v)}
            errors={errors.firstName}
          />
          <FormControl
            label="Last name"
            required={true}
            value={formData.lastName}
            onChange={(v) => onChange("lastName", v)}
            placeholder="Doe"
            errors={errors.lastName}
          />
          <FormControl
            label="Age"
            required={true}
            value={String(formData.age)}
            onChange={(v) => onChange("age", v)}
            placeholder="Enter your age"
            type="number"
            errors={errors.age}
          />
          <FormControl
            label="Password"
            required={true}
            value={formData.password}
            onChange={(v) => onChange("password", v)}
            placeholder="Enter a strong password"
            type="password"
            errors={errors.password}
          />
          <FormControl
            label="Confirm password"
            value={formData.confirmPassword}
            onChange={(v) => onChange("confirmPassword", v)}
            required={true}
            placeholder="Enter a strong password"
            type="password"
            errors={errors.confirmPassword}
          />
          <FormControl
            label="Personal Website URL"
            value={formData.url}
            onChange={(v) => onChange("url", v)}
            placeholder="https://www.google.com"
            errors={errors.url}
          />

          <Box display="flex" alignItems="center" gap={2}>
            <Box flex={1}>
              <FormControl
                label="Hobbies"
                placeholder="Add hobbies"
                value={hobbyEntry}
                onChange={(v) => setHobbyEntry(v)}
              />
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => saveHobby()}
            >
              Add
            </Button>
          </Box>
          <List>
            {formData.hobbies.map((hobby, i) => {
              console.log(errors);
              const isValid = !(errors.hobbies[i]?.length || 0);
              return (
                <ListItem
                  title={isValid ? "" : errors.hobbies[i][0].message}
                  key={hobby}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1.25}
                    borderRadius={4.125}
                    border={`1px solid ${isValid ? "green" : "red"}`}
                    bgcolor={isValid ? "lightgreen" : "lightgoldenrodyellow"}
                  >
                    <IconButton onClick={() => removeHobby(hobby)}>
                      <Delete color={isValid ? "error" : "primary"} />
                    </IconButton>
                    <Typography
                      fontWeight="bold"
                      paddingRight={2}
                      variant="subtitle2"
                    >
                      {hobby}
                    </Typography>
                  </Box>
                </ListItem>
              );
            })}
          </List>

          <pre>valid: {String(isValid)}</pre>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
