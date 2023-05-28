import random
def localisation_trilateration(Cam_01,Cam_02,Cam_03):
  # Latitude, Longitude, distance:
  lat_Cam01,lng_Cam_01,d_Cam01 = Cam_01[0],Cam_01[1],Cam_01[2]
  lat_Cam02,lng_Cam_02,d_Cam02 = Cam_02[0],Cam_02[1],Cam_02[2]
  lat_Cam03,lng_Cam_03,d_Cam03 = Cam_03[0],Cam_03[1],Cam_03[2]
  d1,d2,d3 = d_Cam01,d_Cam02, d_Cam03
  # Create 2d tuple
  #les coordonnees des cameras (lat,long)
  R1 = (lat_Cam01,lng_Cam_01)
  R2 = (lat_Cam02,lng_Cam_02)
  R3 = (lat_Cam03,lng_Cam_03)
  #les constantes 
  A = R1[0]**2 + R1[1]**2 - d1**2
  B = R2[0]**2 + R2[1]**2 - d2**2
  C = R3[0]**2 + R3[1]**2 - d3**2
  
  X32 = R3[0] - R2[0]
  X13 = R1[0] - R3[0]
  X21 = R2[0] - R1[0]

  Y32 = R3[1] - R2[1]
  Y13 = R1[1] - R3[1]
  Y21 = R2[1] - R1[1]

  x = (A * Y32 + B * Y13 + C * Y21)/(2.0*(R1[0]*Y32 + R2[0]*Y13 + R3[0]*Y21))
  y = (A * X32 + B * X13 + C * X21)/(2.0*(R1[1]*X32 + R2[1]*X13 + R3[1]*X21))
  # prompt the result
  return x,y



def simulation(ID):
  """Parking A: used in frist procudre when shipment arrived into the port dimension : 
  Latmin,Latmax:
  Lngmin,Lngmax:  
  """
  """Parking B: used in second procudre when containers in phase of validation <la douane> : 
  Latmin,Latmax:
  Lngmin,Lngmax:  
  """
  """Parking C: used in last procudre when containers is ready for livraison to the client: 
  Latmin,Latmax:
  Lngmin,Lngmax:  
  """
  #shouldnt the parking coordinates change and not be the same ? 
  cord = {
    'Parking_A': [41.356549, 41.355253, 2.167908, 2.171459],
    'Parking_B': [41.355682, 41.354385, 2.167316, 2.170813],
    'Parking_C': [41.353830, 41.352501, 2.166114, 2.169655]
}

  parking_list = ['Parking_A', 'Parking_B', 'Parking_C']
  parking_ch =random.choice(parking_list)
  print('###########Park:',parking_ch," ###########")
  Cam_01=[random.uniform(cord[parking_ch][0],cord[parking_ch][1]),random.uniform(cord[parking_ch][2],cord[parking_ch][-1]),random.uniform(1,3)]
  Cam_02=[random.uniform(cord[parking_ch][0],cord[parking_ch][1]),random.uniform(cord[parking_ch][2],cord[parking_ch][-1]),random.uniform(1,3)]
  Cam_03=[random.uniform(cord[parking_ch][0],cord[parking_ch][1]),random.uniform(cord[parking_ch][2],cord[parking_ch][-1]),random.uniform(1,3)]
  print("Cordination of Virtual Camera")
  print('[INFO].. Camera 01: ',Cam_01)
  print('[INFO].. Camera 02: ',Cam_02)
  print('[INFO].. Camera 03: ',Cam_03)
  x,y = localisation_trilateration(Cam_01,Cam_02,Cam_03)
  print('Containers_Localisation with ID: ',ID,' Latitude: ',x,', Longitude: ',y)
  return x,y

  


simulation("BF7680 09")