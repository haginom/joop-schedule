import FormRow from "./FormRow";

const ParentForm = ({ parentTwo }) => {
  return (
    <div>
      <fieldset>
        <legend>
          {parentTwo ? "Parent/Caregiver 2" : "Parent/Caregiver 1"}{" "}
        </legend>
        <FormRow type="text" name="name" labelText="Name" />
        <FormRow type="text" name="lastName" labelText="Last Name" />

        <FormRow type="number" name="bsn" labelText="BSN" />
        <FormRow type="date" name="dateOfBirth" labelText="Date of Birth" />
        <fieldset>
          <legend>Contact Information</legend>
          <FormRow type="number" name="mobile" labelText="Mobile" />

          <FormRow type="email" name="email" labelText="Email" />
        </fieldset>
        <fieldset>
          <legend>Address</legend>
          <FormRow type="text" name="street" labelText="Street" />
          <FormRow type="text" name="houseNumber" labelText="House Number" />
          <FormRow type="text" name="postCode" labelText="Post Code" />
          <FormRow type="text" name="city" labelText="City" />
        </fieldset>
      </fieldset>
    </div>
  );
};
export default ParentForm;
