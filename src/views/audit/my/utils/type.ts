interface FormItemProps {
  resName: string;
  resSize: string;
  resAuth: string;
  isDownload: string;
  cloumnName: string;
  category: string;
  state: string;
  createUser: string;
  createTime: string;
}

interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
