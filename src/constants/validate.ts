import { Rule } from 'antd/lib/form';

export const INPUT_RULES = {
  required: (max = 0) => {
    const rules: Rule[] = [
      {
        required: true,
        message: '必填'
      },
      {
        whitespace: true,
        message: '不能仅包含空格'
      }
    ];
    if (max === 0) {
      return {
        placeholder: '请输入',
        rules
      };
    }
    const message = `由任意字符组成，最长 ${max} 个字符`;
    rules.push({
      max: max,
      type: 'string',
      message
    });
    return {
      placeholder: message,
      rules
    };
  },
  not_required: (max = 0) => {
    const rules: Rule[] = [
      {
        whitespace: true,
        message: '不能仅包含空格'
      }
    ];
    if (max === 0) {
      return {
        placeholder: '请输入',
        rules
      };
    }
    const message = `由任意字符组成，最长 ${max} 个字符`;
    rules.push({
      max: max,
      type: 'string',
      message
    });
    return {
      placeholder: message,
      rules
    };
  }
};

export const SELECT_RULES = {
  required: (max = 0) => {
    const rules: Rule[] = [
      {
        required: true,
        message: '必选'
      }
    ];

    if (max === 0) {
      return {
        placeholder: '请选择',
        rules
      };
    }
    rules.push({
      max: max,
      type: 'array',
      message: `请选择不超过 ${max} 项`
    });
    return {
      placeholder: `请选择不超过 ${max} 项`,
      rules
    };
  }
};

export const PASSWORD_RULES = {
  required: {
    placeholder: '至少包含数字和字母，长度为 6-18 个字符',
    rules: [
      {
        required: true,
        message: '必填'
      },
      {
        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/,
        message: '至少包含数字和字母，长度为 6-18 个字符'
      }
    ] as Rule[]
  },
  not_required: {
    placeholder: '至少包含数字和字母，长度为 6-18 个字符',
    rules: [
      {
        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/,
        message: '至少包含数字和字母，长度为 6-18 个字符'
      }
    ] as Rule[]
  }
};

export const PHONE_RULES = {
  required: {
    placeholder: '请输入正确的手机号',
    rules: [
      {
        required: true,
        message: '必填'
      },
      {
        pattern: /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/,
        message: '请输入正确的手机号'
      }
    ] as Rule[]
  }
};

export const EMAIL_RULE = {
  required: {
    placeholder: '请输入正确的邮箱',
    rules: [
      {
        required: true,
        message: '必填'
      },
      {
        pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        message: '请输入正确的邮箱'
      }
    ] as Rule[]
  }
};
