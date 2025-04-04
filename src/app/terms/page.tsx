export default function TermsPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight">服务条款</h1>
          <p className="text-muted-foreground">
            最后更新日期: 2023年4月1日
          </p>
        </div>

        <div className="prose prose-stone dark:prose-invert max-w-none">
          <p className="text-lg">
            欢迎使用Keep Thinking博客平台。请仔细阅读以下条款和条件。使用我们的服务即表示您同意这些条款。
          </p>

          <h2 className="text-2xl font-semibold mt-8">1. 接受条款</h2>
          <p>
            通过访问或使用Keep Thinking博客平台（以下简称&ldquo;平台&rdquo;），您同意受这些服务条款（以下简称&ldquo;条款&rdquo;）的约束。如果您不同意这些条款的任何部分，请不要使用我们的服务。
          </p>

          <h2 className="text-2xl font-semibold mt-8">2. 账户注册</h2>
          <p>
            要使用我们的某些功能，您需要注册一个账户。您同意：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>提供准确、完整和最新的信息</li>
            <li>维护和更新您的账户信息</li>
            <li>保护您的账户安全，包括保护您的密码</li>
            <li>对您账户下的所有活动负责</li>
            <li>立即通知我们任何未经授权使用您账户的情况</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">3. 用户内容</h2>
          <p>
            您保留您发布到平台的所有内容的所有权。通过发布内容，您授予我们：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>全球性、非独占性、免版税的许可，允许我们使用、复制、修改、创建衍生作品、分发和公开展示您的内容</li>
            <li>使用您的内容来推广和改进我们的服务的权利</li>
            <li>删除任何违反这些条款或我们政策的内容的权利</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">4. 用户行为</h2>
          <p>
            您同意不会：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>违反任何适用的法律或法规</li>
            <li>侵犯他人的知识产权或其他权利</li>
            <li>发布虚假、误导性或欺诈性的内容</li>
            <li>骚扰、虐待或伤害他人</li>
            <li>传播病毒或其他恶意代码</li>
            <li>干扰或破坏平台的服务或服务器</li>
            <li>未经授权访问平台或其他用户的账户</li>
            <li>收集或存储其他用户的个人信息</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">5. 知识产权</h2>
          <p>
            平台及其原始内容、功能和软件是Keep Thinking的财产，受版权、商标、专利和其他知识产权法律的保护。
          </p>

          <h2 className="text-2xl font-semibold mt-8">6. 免责声明</h2>
          <p>
            平台按&ldquo;现状&rdquo;提供，不提供任何明示或暗示的保证。我们不保证：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>平台将不间断、及时、安全或无错误</li>
            <li>平台上的内容准确、完整或可靠</li>
            <li>任何错误或缺陷将被纠正</li>
            <li>平台无病毒或其他有害组件</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">7. 责任限制</h2>
          <p>
            在任何情况下，Keep Thinking或其关联公司、员工、代理或供应商均不对任何直接、间接、附带、特殊、后果性或惩罚性损害负责，包括但不限于利润损失、数据损失、使用损失、商誉损失或其他无形损失。
          </p>

          <h2 className="text-2xl font-semibold mt-8">8. 终止</h2>
          <p>
            我们可能会终止或暂停您的账户和访问权限：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>如果您违反这些条款</li>
            <li>如果我们怀疑您有欺诈或滥用行为</li>
            <li>如果我们决定停止提供服务</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">9. 条款的修改</h2>
          <p>
            我们保留随时修改这些条款的权利。修改后的条款将在平台上发布时生效。继续使用平台即表示您接受修改后的条款。
          </p>

          <h2 className="text-2xl font-semibold mt-8">10. 适用法律</h2>
          <p>
            这些条款受中华人民共和国法律管辖，不考虑法律冲突原则。
          </p>

          <h2 className="text-2xl font-semibold mt-8">11. 联系我们</h2>
          <p>
            如果您对这些条款有任何疑问，请通过以下方式联系我们：
          </p>
          <p className="bg-muted p-4 rounded-md mt-2">
            邮箱: legal@keepthinking.com<br />
            地址: 北京市海淀区中关村大街1号
          </p>
        </div>
      </div>
    </div>
  );
} 