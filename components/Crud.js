import { useEffect, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { Input, Button } from "web3uikit";
import { abi, contractAddresses } from "../constants";

export default function Crud() {

  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const crudAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [nam, setName] = useState("");
  const [id, setId] = useState("");
  const [deleId, setDeleId] = useState("");
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const { runContractFunction: createOnS } = useWeb3Contract({
    abi: abi,
    contractAddress: crudAddress,
    functionName: "create",
    params: { name: nam },
  });
  const { runContractFunction: readOnS } = useWeb3Contract({
    abi: abi,
    contractAddress: crudAddress,
    functionName: "read",
    params: { id: id },
  });
  const { runContractFunction: update } = useWeb3Contract({
    abi: abi,
    contractAddress: crudAddress,
    functionName: "update",
    params: { id: editId, name: editName },
  });
  const { runContractFunction: deleteId } = useWeb3Contract({
    abi: abi,
    contractAddress: crudAddress,
    functionName: "deleteId",
    params: { id: id },
  });
  // console.log(nam);
  console.log(editId);
  async function read() {
    const s = await readOnS();
    document.getElementById("create-result").innerHTML = s;
  }

  return (
    <div>
      <div className="flex flex-row pl-12">
        <div>
          <h4>Create User</h4>
          <br />
          <Input
            id="create"
            label="Name"
            name="Create User"
            onBlur={function noRefCheck() {}}
            value={nam}
            onChange={({ target }) => setName(target?.value)}
          />
          <Button
            color="blue"
            onClick={async function () {
              await createOnS();
            }}
            text="Create User"
            theme="colored"
          />
        </div>

        <div className="ml-auto pr-12">
          <h4>Read User</h4>
          <br />
          <Input
            id="read"
            label="Id"
            name="Read User"
            onBlur={function noRefCheck() {}}
            value={id}
            onChange={({ target }) => setId(target?.value)}
          />
          <Button
            color="blue"
            onClick={async function () {
              await read();
            }}
            text="Read"
            theme="colored"
          />
          <span id="create-result">Value </span>
        </div>
      </div>
      <br />
      <div className="flex flex-row pl-12">
        <div>
          <h4>Edit User</h4>
          <br />
          <Input
            id="edit-id"
            label="Id"
            name="Edit User"
            onBlur={function noRefCheck() {}}
            value={editId}
            onChange={({ target }) => setEditId(target?.value)}
          />
          <Input
            id="edit-name"
            label="Name"
            name="Test text Input"
            onBlur={function noRefCheck() {}}
            value={editName}
            onChange={({ target }) => setEditName(target?.value)}
          />

          <Button
            color="red"
            onClick={async function () {
              await update();
              console.log("done");
            }}
            text="Update Name"
            theme="colored"
          />
          <br />
        </div>

        <div className="ml-auto pr-12">
          <h4>Delete User</h4>
          <br />
          <Input
            id="delete"
            label="Id To Delete"
            name="Test text Input"
            onBlur={function noRefCheck() {}}
            value={deleId}
            onChange={({ target }) => setDeleId(target?.value)}
          />
          <br />
          <Button
            color="red"
            onClick={async function () {
              await deleteId();
              console.log("done");
            }}
            text="Delete Name"
            theme="colored"
          />
        </div>
      </div>
      <a
        href="https://goerli.etherscan.io/address/0x78b5d76986cEdBcF0d74Faa9Bf606721463E10a6#code"
        className="border-b-2 border-blue-500"
      >
        Click to view on Goerli Etherscan
      </a>
    </div>
  );
}
