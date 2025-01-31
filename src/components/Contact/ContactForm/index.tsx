import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Result = () => {
  return (
    <p className="success-message">Thanks for your query. We will contact with you soon.</p>
  )
}

function ContactForm({ formStyle }: {
  formStyle: string
}) {
  const [result, setResult] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_bxh6md3',
        'template_1g7v07n',
        e.target as HTMLFormElement,
        'user_8Lx0gfI1ktOoeEN8DTV10dee'
      )
      .then((result) => {
        console.log(result.text);
      },
        (error) => {
          console.log(error.text);
        }
      );
    (e.target as HTMLFormElement).reset();
    setResult(true);
  };

  setTimeout(() => {
    setResult(false);
  }, 5000);

  return (
    <form className={`${formStyle}`} action="" onSubmit={sendEmail}>
      <div className="col-lg-6">
        <div className="form-group">
          <input type="text" className="form-control form-control-lg" name="fullname" placeholder="Name*" required />
        </div>
      </div>

      <div className="col-lg-6">
        <div className="form-group">
          <input type="email" className="form-control form-control-lg" name="email" placeholder="Email*" required />
        </div>
      </div>

      <div className="col-lg-12">
        <div className="form-group">
          <input type="text" className="form-control form-control-lg" name="subject" placeholder="Subject" />
        </div>
      </div>
      <div className="col-lg-12">
        <div className="form-group">
          <textarea className="form-control" name="message" placeholder="Your comment"></textarea>
        </div>
      </div>
      <div className="col-lg-12">
        <button className="rn-btn btn" type="submit">
          <span>Submit Now</span><i className="icon-arrow-right-line-right"></i>
        </button>
      </div>
      {result ? <div className="form-group"><Result /></div> : null}
    </form>
  )
}
export default ContactForm;