import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plane, Hotel, Map, Luggage } from 'lucide-react';

const SkiTripPlanner = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">טיול סקי באבוריאז</h1>
          <p className="text-slate-600">19-26 ינואר 2025</p>
        </header>

        <Tabs defaultValue="flights" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="flights" className="flex items-center gap-2 flex-row-reverse">
              <Plane className="h-4 w-4 ml-1" />
              טיסות
            </TabsTrigger>
            <TabsTrigger value="accommodation" className="flex items-center gap-2 flex-row-reverse">
              <Hotel className="h-4 w-4 ml-1" />
              לינה
            </TabsTrigger>
            <TabsTrigger value="resort" className="flex items-center gap-2 flex-row-reverse">
              <Map className="h-4 w-4 ml-1" />
              אתר הסקי
            </TabsTrigger>
            <TabsTrigger value="packing" className="flex items-center gap-2 flex-row-reverse">
              <Luggage className="h-4 w-4 ml-1" />
              ציוד
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flights">
            <Card className="border-r-4 border-r-blue-500">
              <CardHeader>
                <CardTitle className="text-right">פרטי טיסות</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold mb-4 text-lg">טיסה הלוך - 19 בינואר</h3>
                    <div className="space-y-2 text-right">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">מספר טיסה:</span>
                        <span>ISRAIR 6H141</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">המראה:</span>
                        <span>תל אביב - 08:25</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">נחיתה:</span>
                        <span>ALPS-ISERE - 12:05</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4 text-lg">טיסה חזור - 26 בינואר</h3>
                    <div className="space-y-2 text-right">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">מספר טיסה:</span>
                        <span>ISRAIR 6H142</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">המראה:</span>
                        <span>ALPS-ISERE - 13:05</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">נחיתה:</span>
                        <span>תל אביב - 18:10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accommodation">
            <Card className="border-r-4 border-r-green-500">
              <CardHeader>
                <CardTitle className="text-right">מלון</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">RESIDENCE ATRIA CROZAT 3*</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">תאריך כניסה:</span>
                      <span>19 בינואר</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">תאריך יציאה:</span>
                      <span>26 בינואר</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">משך השהייה:</span>
                      <span>7 לילות</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">סוג חדר:</span>
                      <span>דירה ל-4 אנשים</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resort">
            <Card className="border-r-4 border-r-purple-500">
              <CardHeader>
                <CardTitle className="text-right">פרטי אתר הסקי</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Portes Du Soleil</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">תוקף סקיפס:</span>
                      <span>20-25 בינואר</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">העברות:</span>
                      <span>כלולות הלוך ושוב</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">ציוד נוסף:</span>
                      <span>כרטיס סקי ופיקדון</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packing">
            <Card className="border-r-4 border-r-orange-500">
              <CardHeader>
                <CardTitle className="text-right">רשימת ציוד</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="text-right">
                      <h3 className="font-semibold mb-4 text-lg border-b pb-2">ציוד סקי</h3>
                      <ul className="space-y-2 text-right pr-4">
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>קסדה</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מגלשיים / קרש</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מקלות</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>נעלי סקי</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מעיל סקי</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מכנסי סקי</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מגן גב</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מגן תחת</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>משקף סקי</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>כפפות סקי</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-right">
                      <h3 className="font-semibold mb-4 text-lg border-b pb-2">ביגוד</h3>
                      <ul className="space-y-2 text-right pr-4">
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>חליפה תרמית כפול 3</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>כובע גרב</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>חם צוואר</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>גרביים חמות</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>סווטשירט לטיסה</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מכנסי טיסה</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>טרנינג ללילה</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>3 ג׳ינסים</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-right">
                      <h3 className="font-semibold mb-4 text-lg border-b pb-2">ציוד אישי</h3>
                      <ul className="space-y-2 text-right pr-4">
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>דרכונים</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>כסף</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>כרטיסי אשראי</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מטענים</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>אייפד</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>אוזניות</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>קינדל</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>כרית צוואר</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SkiTripPlanner;