import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

interface Props {
  account: string;
  accountId: string;
}

export const AccountCollumn = ({ account, accountId }: Props) => {
  const { onOpen: onOpenAccount } = useOpenAccount();

  const onClick = () => {
    onOpenAccount(accountId);
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer hover:underline transition dura"
    >
      {account}
    </div>
  );
};
