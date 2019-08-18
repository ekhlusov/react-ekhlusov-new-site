import React from "react";
import { Formik } from "formik";
import { TitleWithLines } from "./helpers/helpers";
import * as Yup from "yup";

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Имя слишком короткое")
    .required("Обязательное поле"),

  email: Yup.string()
    .email("Неверный email")
    .required("Обязательное поле"),

  text: Yup.string()
    .min(5, "Сообщение слишком короткое")
    .required("Обязательное поле")
});

function ContactForm(props) {
  return (
    <div className="right-container__contact-form">
      <TitleWithLines text="Обратная связь" />

      <Formik
        initialValues={{ name: "", email: "", text: "" }}
        validationSchema={ContactFormSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className="form-control"
              />
              <div className="error">
                {errors.name && touched.name && errors.name}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="form-control"
              />
              <div className="error">
                {errors.email && touched.email && errors.email}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Сообщение</label>
              <textarea
                name="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.text}
                className="form-control"
                rows="5 "
              >
                {values.text}
              </textarea>
              <div className="error">
                {errors.text && touched.text && errors.text}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-default"
            >
              Отправить
            </button>
          </form>
        )}
      </Formik>
      <div className="clearfix" />
    </div>
  );
}

export default ContactForm;
