import React, { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from '../../../../ethereum/campaign';
import web3 from "../../../../ethereum/web3";
import Link from 'next/link';
import { useRouter } from "next/router";
import Layout from "../../../../components/Layout";


export async function getServerSideProps({ params }) {
    const { address } = params;

    return {
        props: {
            address,
        }
    }
}

const RequestNew = ({ address }) => {
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [recipient, setRecipient] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();

        const campaign = Campaign(address);
        setLoading(true);
        setErrorMessage("");

        try {
          const accounts = await web3.eth.getAccounts();
          await campaign.methods
            .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
            .send({ from: accounts[0] });
          router.push(`/campaigns/${address}/requests`);
        } catch (err) {
          setErrorMessage(err.message);
        }

        setLoading(false);
      };

      return (
        <Layout>
          <Link href={`/campaigns/${address}/requests`}>
            <a>Back</a>
          </Link>
          <h3>Create a Request</h3>
          <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
              <label>Description</label>
              <Input
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Value in Ether</label>
              <Input
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Recipient</label>
              <Input
                value={recipient}
                onChange={(event) =>
                  setRecipient(event.target.value)
                }
              />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage} />
            <Button primary loading={loading}>
              Create!
            </Button>
          </Form>
        </Layout>
      );
};

export default RequestNew;
