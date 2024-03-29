import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAddPasswordMutation from "@/react-query/useAddPasswordMutation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";
import { PasswordProp } from "@/types";
import useUpdatePasswordMutation from "@/react-query/useUpdatePasswordMutation";

export function AddPassword({
  open,
  onClose,
  isUpdate,
  pass,
}: {
  open: boolean;
  onClose: () => void;
  isUpdate: boolean;
  pass: PasswordProp;
}) {
  const [id, setId] = useState(-1);
  const [siteUrl, setSiteUrl] = useState("");
  const [siteName, setSiteName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const addPassword = useAddPasswordMutation();
  const updatePassword = useUpdatePasswordMutation();

  const { toast } = useToast();

  useEffect(() => {
    if (pass.id && pass.site_url && pass.site_name && pass.username) {
      setId(pass.id);
      setSiteUrl(pass.site_url);
      setSiteName(pass.site_name);
      setUsername(pass.username);
    }
  }, [open, isUpdate, pass]);

  return (
    <div
      className={`w-full rounded-t-3xl absolute ${
        !open ? "h-0" : "h-[86%] sm:h-[82%]"
      } bottom-0 left-0 bg-green duration-300 transition-all hover:shadow-[0px_-7px_#000] shadow-[0px_-4px_#000] z-[9999]`}
    >
      <div className="w-full h-full p-3">
        <div className="bg-white py-6 px-5 h-full overflow-y-auto rounded-3xl">
          <X
            className="absolute right-6 top-6 cursor-pointer bg-white rounded-full"
            onClick={() => {
              setSiteUrl("");
              setSiteName("");
              setUsername("");
              setPassword("");
              onClose();
            }}
          />
          <h1 className="text-lg font-bold mb-5">
            {isUpdate ? "Update" : "Add"} Password
          </h1>
          <div className="mb-4">
            <Label className="!text-[0.7rem]" htmlFor="password">
              Site Name
            </Label>
            <div className="flex gap-2 items-center">
              <Input
                className={`!border-gray-600 mt-1 h-10 !rounded-md border !bg-transparent !px-3 !py-2 !text-md !ring-offset-background file:!border-0 file:!bg-transparent file:!text-md file:!font-medium placeholder:!text-muted-foreground focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50`}
                type="text"
                autoComplete="off"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <Label className="!text-[0.7rem]" htmlFor="password">
              Site URL
            </Label>
            <div className="flex gap-2 items-center">
              <Input
                className={`!border-gray-600 mt-1 h-10 !rounded-md border !bg-transparent !px-3 !py-2 !text-md !ring-offset-background file:!border-0 file:!bg-transparent file:!text-md file:!font-medium placeholder:!text-muted-foreground focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50`}
                type="text"
                autoComplete="off"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <Label className="!text-[0.7rem]" htmlFor="password">
              Username
            </Label>
            <div className="flex gap-2 items-center">
              <Input
                className={`!border-gray-600 mt-1 h-10 !rounded-md border !bg-transparent !px-3 !py-2 !text-md !ring-offset-background file:!border-0 file:!bg-transparent file:!text-md file:!font-medium placeholder:!text-muted-foreground focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50`}
                type="text"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <Label className="!text-[0.7rem]" htmlFor="password">
              Password
            </Label>
            <div className="flex gap-2 items-center">
              <Input
                className={`!border-gray-600 mt-1 h-10 !rounded-md border !bg-transparent !px-3 !py-2 !text-md !ring-offset-background file:!border-0 file:!bg-transparent file:!text-md file:!font-medium placeholder:!text-muted-foreground focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50`}
                type="text"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="w-full"
            onClick={async () => {
              setLoading(true);
              if (isUpdate) {
                const updatesStatus = await updatePassword.mutateAsync({
                  id: id,
                  body: {
                    site_url: siteUrl,
                    site_name: siteName,
                    username,
                    password,
                  },
                });
                if (updatesStatus.status === 200) {
                  toast({
                    description: "Password saved successfully",
                    duration: 5000,
                  });
                  setId(-1);
                  setSiteUrl("");
                  setSiteName("");
                  setUsername("");
                  setPassword("");
                  onClose();
                } else {
                  toast({
                    description: (
                      <ul>
                        {updatesStatus.data.map((e: any, i: number) => (
                          <li key={i} className="list-disc">
                            {e.msg}
                          </li>
                        ))}
                      </ul>
                    ),
                    variant: "destructive",
                    duration: 5000,
                  });
                }
              } else {
                const addedStatus = await addPassword.mutateAsync({
                  site_url: siteUrl,
                  site_name: siteName,
                  username,
                  password,
                });
                if (addedStatus.status === 200) {
                  toast({
                    description: "Password saved successfully",
                    duration: 5000,
                  });
                  setId(-1);
                  setSiteUrl("");
                  setSiteName("");
                  setUsername("");
                  setPassword("");
                  onClose();
                } else {
                  toast({
                    description: (
                      <ul>
                        {addedStatus.data.map((e: any, i: number) => (
                          <li key={i} className="list-disc">
                            {e.msg}
                          </li>
                        ))}
                      </ul>
                    ),
                    variant: "destructive",
                    duration: 5000,
                  });
                }
              }

              setLoading(false);
            }}
            disabled={
              loading ||
              siteUrl.trim() === "" ||
              siteName.trim() === "" ||
              username.trim() === "" ||
              password.trim() === ""
            }
          >
            {isUpdate ? "Update" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
}
