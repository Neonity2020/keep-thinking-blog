export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight">隐私政策</h1>
          <p className="text-muted-foreground">
            最后更新日期: 2023年4月1日
          </p>
        </div>

        <div className="prose prose-stone dark:prose-invert max-w-none">
          <p className="text-lg">
            欢迎访问Keep Thinking博客平台。我们非常重视您的隐私，并致力于保护您的个人信息。本隐私政策旨在向您说明我们如何收集、使用、存储和共享您的个人信息，以及您享有的相关权利。
          </p>

          <h2 className="text-2xl font-semibold mt-8">1. 我们收集的信息</h2>
          <p>
            我们可能收集以下类型的信息：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>账户信息</strong>：当您注册账户时，我们会收集您的姓名、电子邮件地址、密码等信息。
            </li>
            <li>
              <strong>个人资料信息</strong>：您可以选择提供额外的个人信息，如头像、个人简介等。
            </li>
            <li>
              <strong>内容信息</strong>：您发布的博客文章、评论等内容。
            </li>
            <li>
              <strong>使用数据</strong>：我们可能会收集有关您如何使用我们服务的信息，如访问时间、浏览的页面等。
            </li>
            <li>
              <strong>设备信息</strong>：我们可能会收集有关您使用的设备的信息，如设备类型、操作系统、浏览器类型等。
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">2. 我们如何使用您的信息</h2>
          <p>
            我们可能将您的信息用于以下目的：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>提供、维护和改进我们的服务</li>
            <li>处理您的请求和交易</li>
            <li>发送服务通知和更新</li>
            <li>响应您的评论、问题和请求</li>
            <li>个性化您的体验</li>
            <li>监控和分析使用情况和趋势</li>
            <li>检测、调查和防止欺诈和其他非法活动</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">3. 我们如何共享您的信息</h2>
          <p>
            我们不会出售您的个人信息。我们可能在以下情况下共享您的信息：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>服务提供商</strong>：我们可能会与帮助我们提供服务的第三方服务提供商共享您的信息。
            </li>
            <li>
              <strong>法律要求</strong>：如果我们认为有必要遵守法律、法规、法律程序或政府请求，我们可能会披露您的信息。
            </li>
            <li>
              <strong>保护权利</strong>：我们可能会披露您的信息，以保护我们的权利、隐私、安全或财产，以及我们的用户或公众的权利、隐私、安全或财产。
            </li>
            <li>
              <strong>业务转让</strong>：如果涉及合并、收购或资产出售，我们可能会转移您的信息。
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">4. 您的权利</h2>
          <p>
            根据适用的数据保护法律，您可能拥有以下权利：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>访问您的个人信息</li>
            <li>更正不准确的个人信息</li>
            <li>删除您的个人信息</li>
            <li>限制或反对处理您的个人信息</li>
            <li>数据可携带性</li>
            <li>撤回同意</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">5. 数据安全</h2>
          <p>
            我们采取合理的技术和组织措施来保护您的个人信息，防止未经授权的访问、使用或披露。然而，没有任何互联网传输或电子存储方法是100%安全的，因此我们不能保证绝对的安全性。
          </p>

          <h2 className="text-2xl font-semibold mt-8">6. 儿童隐私</h2>
          <p>
            我们的服务不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。如果您发现我们可能收集了13岁以下儿童的个人信息，请立即联系我们。
          </p>

          <h2 className="text-2xl font-semibold mt-8">7. 国际数据传输</h2>
          <p>
            您的信息可能会被转移到您所在国家/地区以外的国家/地区进行处理。这些国家/地区可能具有不同的数据保护法律。我们会采取适当措施确保您的信息得到保护。
          </p>

          <h2 className="text-2xl font-semibold mt-8">8. 隐私政策的变更</h2>
          <p>
            我们可能会不时更新本隐私政策。当我们进行重大变更时，我们会通过在我们的网站上发布通知或直接通知您来通知您。
          </p>

          <h2 className="text-2xl font-semibold mt-8">9. 联系我们</h2>
          <p>
            如果您对本隐私政策有任何疑问或顾虑，请通过以下方式联系我们：
          </p>
          <p className="bg-muted p-4 rounded-md mt-2">
            邮箱: privacy@keepthinking.com<br />
            地址: 北京市海淀区中关村大街1号
          </p>
        </div>
      </div>
    </div>
  );
} 