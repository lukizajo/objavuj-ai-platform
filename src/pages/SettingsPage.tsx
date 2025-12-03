import React, { useState } from 'react'
import { ArrowLeft, Mail, Bell, Users, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Toggle } from '@/components/ui/Toggle'
import { useTranslation } from '@/hooks/useTranslation'

const SettingsPage: React.FC = () => {
  const { t } = useTranslation()
  
  // Email notification states (UI only for now)
  const [inactivityReminder, setInactivityReminder] = useState(true)
  const [newContentNotifications, setNewContentNotifications] = useState(true)
  const [communityUpdates, setCommunityUpdates] = useState(false)

  return (
    <MainLayout>
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Späť na dashboard
          </Link>
          <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary">
            Nastavenia
          </h1>
          <p className="text-text-secondary dark:text-dark-text-secondary mt-2">
            Spravujte svoje preferencie a nastavenia účtu
          </p>
        </div>

        <div className="max-w-4xl">
          <div className="space-y-8">
            {/* Email Notifications Section */}
            <Card>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-light dark:bg-primary/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary">
                      Emailové notifikácie
                    </h2>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      Nastavte si, aké emailové upozornenia chcete dostávať
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Inactivity Reminder */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 dark:bg-dark-muted/30 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-text-primary dark:text-dark-text-primary">
                          Pripomienka po nečinnosti
                        </h3>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                          Dostávajte upozornenia keď sa vrátite k učeniu
                        </p>
                      </div>
                    </div>
                    <Toggle
                      checked={inactivityReminder}
                      onCheckedChange={setInactivityReminder}
                    />
                  </div>

                  {/* New Content */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 dark:bg-dark-muted/30 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-text-primary dark:text-dark-text-primary">
                          Nový obsah
                        </h3>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                          Upozornenia keď je pridaný nový kurz alebo lekcia
                        </p>
                      </div>
                    </div>
                    <Toggle
                      checked={newContentNotifications}
                      onCheckedChange={setNewContentNotifications}
                    />
                  </div>

                  {/* Community Updates */}
                  <div className="flex items-center justify-between p-4 bg-muted/30 dark:bg-dark-muted/30 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-text-primary dark:text-dark-text-primary">
                          Komunitné aktualizácie
                        </h3>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                          Novinky z komunity a diskusie
                        </p>
                      </div>
                    </div>
                    <Toggle
                      checked={communityUpdates}
                      onCheckedChange={setCommunityUpdates}
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 pt-6 border-t border-border dark:border-dark-border">
                  <Button variant="primary">
                    Uložiť nastavenia
                  </Button>
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-2">
                    Backend integrácia bude implementovaná neskôr
                  </p>
                </div>
              </div>
            </Card>

            {/* Other Settings Sections (Placeholder) */}
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                  Ďalšie nastavenia
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/20 dark:bg-dark-muted/20 rounded-lg">
                    <h3 className="font-medium text-text-primary dark:text-dark-text-primary mb-2">
                      Jazykové nastavenia
                    </h3>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      Jazyk aplikácie môžete zmeniť v hlavičke stránky
                    </p>
                  </div>
                  <div className="p-4 bg-muted/20 dark:bg-dark-muted/20 rounded-lg">
                    <h3 className="font-medium text-text-primary dark:text-dark-text-primary mb-2">
                      Téma
                    </h3>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      Svetlú/tmavú tému môžete zmeniť v hlavičke stránky
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default SettingsPage
