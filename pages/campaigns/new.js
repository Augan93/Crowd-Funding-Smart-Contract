import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";


const CampaignNew = (props) => {

  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minimumContribution)
        .send({
          from: accounts[0],
        });

      router.push("/");

    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

    return (
      <Layout>
        <h3>Create Campaign</h3>
        <Form onSubmit={onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={minimumContribution}
              onChange={(event) =>
                setMinimumContribution(event.target.value)
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={errorMessage} />
          <Button loading={loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
}

export default CampaignNew;
