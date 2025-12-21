import { SettingsForm } from "./components/settings-form";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Cài đặt</h1>
      </div>
      <SettingsForm />
    </div>
  );
}
